'use client'
import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { changeStatus, getAllProducts, newProduct, updateProduct } from '../server/products';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ToastType, useToast } from "../components/toast";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

export default function Produtos() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [returnValue, setReturnValue] = useState('');
  const [products, setproducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const { addToast } = useToast();

  const [value, setValue] = useState(editingProduct?.price || '');

  // Função para aplicar a máscara no valor
  const applyMask = (rawValue: string): string => {
    // Remove qualquer caractere que não seja número
    const onlyNumbers = rawValue.replace(/\D/g, '');
    // Formata para o padrão "1234,56"
    const maskedValue = onlyNumbers.replace(/^(\d+)(\d{2})$/, '$1.$2');
    return maskedValue;
  };

  // Manipulador para atualizar o valor formatado
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = applyMask(rawValue);
    setValue(formattedValue);
  };

  const handleToast = (message: string, type: ToastType) => {
    addToast(message, type);
    setReturnValue('');
    getAllProductsDB();
  };

  const getAllProductsDB = async () => {
    const result = await getAllProducts();

    if (result.status !== 200) {
      handleToast(result.message, 'error');
    }

    setproducts(result.data);
  };

  const openEditModal = (client: any) => {
    setEditingProduct({ ...client });
    onOpen();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (editingProduct) {
      const returnDB = await updateProduct(editingProduct.id, formData);
      if (returnDB.status !== 200) {
        setReturnValue(returnDB.message);
      } else {
        handleToast("Cliente atualizado com sucesso!", "success");
        getAllProductsDB();
        setReturnValue('');
        onClose();
      }
    } else {
      const returnDB = await newProduct(formData);
      if (returnDB.status !== 201) {
        setReturnValue(returnDB.message);
      } else {
        handleToast("Cliente cadastrado com sucesso!", "success");
        setReturnValue('');
        getAllProductsDB();
        onClose();
      }
    }
  }

  const handleChangeStatus = async (id: string) => {
    const returnDB = await changeStatus(id);

    if (returnDB.status !== 200) {
      handleToast(returnDB.message, 'error');
    } else {
      handleToast("Cliente atualizado com sucesso!", "info");
      getAllProductsDB();
    }
  };


  useEffect(() => {
    getAllProductsDB();
  }, []);

  return (
    <div>
      <Header />
      <section className="flex pt-16 items-center justify-start flex-col w-screen h-screen p-2">
        <div className="mt-8 mr-2 w-screen flex justify-end">
          <Button onPress={() => { setEditingProduct(null); onOpen(); }} color="secondary" variant="solid">
            Novo produto
          </Button>

        </div>

        <div className="flex flex-wrap gap-4 m-10">
          {
            products.length > 0 && products.map((product: any) => (
              <Card className="w-[400px] m-5" key={product.id}>
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{product.name.toUpperCase()}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-slate-400">{product.brand}</p>
                  <p className="text-slate-400">{product.quantity}</p>
                  <p className="text-slate-400">{product.price}</p>
                </CardBody>
                <Divider />
                <CardFooter className="flex row justify-between">
                  <Button color="primary" variant="solid" onPress={() => openEditModal(product)}>
                    Editar
                  </Button>
                  <Button
                    color={product.status === 'active' ? 'danger' : 'success'}
                    variant="bordered"
                    onPress={() => handleChangeStatus(product.id)}
                  >
                    {product.status === 'active' ? 'Desativar' : 'Ativar'}
                  </Button>
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </section>
      <Footer />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">
                {editingProduct ? "Editar produto" : "Novo produto"}
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                  <Input
                    label="Nome"
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={editingProduct?.name || ''}
                    isRequired
                  />
                  <Input
                    label="Marca"
                    type="text"
                    name="brand"
                    id="brand"
                    defaultValue={editingProduct?.brand || ''}
                    isRequired
                  />
                  <Input
                    label="Quantidade"
                    type="number"
                    name="stock"
                    id="stock"
                    defaultValue={editingProduct?.stock || ''}
                    isRequired
                  />
                  <Input
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">R$</span>
                      </div>
                    }
                    label="Price" 
                    placeholder="0.00"
                    type="text" 
                    value={value}
                    onChange={handleValueChange} // Aplica a máscara ao digitar.
                    name="price"
                    id="price"
                    defaultValue={editingProduct?.price || ''}
                    isRequired

                  />
                  {returnValue && (
                    <div>
                      <p className="text-red-500">{returnValue}</p>
                    </div>
                  )}
                  <ModalFooter className="flex row justify-between">
                    <Button color="primary" type="submit">
                      Salvar
                    </Button>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
