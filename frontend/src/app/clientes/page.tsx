'use client'
import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { changeStatus, getAllClients, newClient, updateClient } from '../server/clients';
import { FormEvent, useEffect, useState } from 'react';
import { ToastType, useToast } from "../components/toast";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

export default function Clientes() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [returnValue, setReturnValue] = useState('');
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState<any | null>(null);
  const { addToast } = useToast();

  const handleToast = (message: string, type: ToastType) => {
    addToast(message, type);
    setReturnValue('');
    getAllClientsDB();
  };

  const getAllClientsDB = async () => {
    const result = await getAllClients();

    if (result.status !== 200) {
      handleToast(result.message, 'error');
    }

    setClients(result.data);
  };

  const openEditModal = (client: any) => {
    setEditingClient({...client});
    onOpen();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (editingClient) {
      const returnDB = await updateClient(editingClient.id, formData);
      if (returnDB.status !== 200) {
        setReturnValue(returnDB.message);
      } else {
        handleToast("Cliente atualizado com sucesso!", "success");
        getAllClientsDB();
        setReturnValue('');
        onClose();
      }
    } else {
      const returnDB = await newClient(formData);
      if (returnDB.status !== 201) {
        setReturnValue(returnDB.message);
      } else {
        handleToast("Cliente cadastrado com sucesso!", "success");
        setReturnValue('');
        getAllClientsDB();
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
      getAllClientsDB();
    }
  };
console.log(editingClient)
  useEffect(() => {
    getAllClientsDB();
  }, []);

  return (
    <div>
      <Header />
      <section className="flex pt-16 items-center justify-start flex-col w-screen h-screen p-2">
        <div className="mt-8 mr-2 w-screen flex justify-end">
          <Button onPress={() => { setEditingClient(null); onOpen(); }} color="secondary" variant="solid">
            Novo cliente
          </Button>

          
        </div>
       
        <div className="flex flex-wrap gap-4 m-10">
          {
            clients.length > 0 && clients.map((client: any) => (
              <Card className="w-[400px] m-5" key={client.id}>
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{client.name.toUpperCase()}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-slate-400">{client.email}</p>
                  <p className="text-slate-400">{client.bornDate}</p>
                </CardBody>
                <Divider />
                <CardFooter className="flex row justify-between">
                  <Button color="primary" variant="solid" onPress={() => openEditModal(client)}>
                    Editar
                  </Button>
                  <Button
                    color={client.status === 'active' ? 'danger' : 'success'}
                    variant="bordered"
                    onPress={() => handleChangeStatus(client.id)}
                  >
                    {client.status === 'active' ? 'Desativar' : 'Ativar'}
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
                {editingClient ? "Editar cliente" : "Novo cliente"}
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                  <Input
                    label="Nome"
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={editingClient?.name || ''}
                    isRequired
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={editingClient?.email || ''}
                    isRequired
                  />
                  <Input
                    label="Data de nascimento"
                    type="date"
                    name="bornDate"
                    id="bornDate"
                    defaultValue={editingClient?.bornDate || ''}
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
