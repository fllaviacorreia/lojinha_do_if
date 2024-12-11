'use client'
import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { getAllClients, newClient } from '../server/clients';
import { FormEvent, useEffect, useState } from 'react';
import { ToastType, useToast } from "../components/toast";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [returnValue, setReturnValue] = useState('');
  const [clients, setClients] = useState([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const returnDB = await newClient(formData);

    if (returnDB.status !== 201) {
      setReturnValue(returnDB.message);
    } else {
      onClose();
      handleToast("Cliente cadastrado com sucesso!", 'success');
      getAllClientsDB();
    }
  }

  const getAllClientsDB = async () => {
    const result = await getAllClients();

    if (result.status !== 200) {
      handleToast(result.message, 'error');
    }

    setClients(result.data);
  }

  useEffect(() => {
    getAllClientsDB();
  }, []);


  const { addToast } = useToast();

  const handleToast = (message: string, type: ToastType) => {
    addToast(message, type);
  };

  return (
    <div>
      <Header />
      <section className="flex pt-16 items-center justify-start flex-col w-screen h-screen p-2">
        <div className="mt-8 mr-2 w-screen flex justify-end">
          <Button onPress={onOpen} color="secondary" variant="solid">
            Novo cliente
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 m-10">
              {clients.map((client: any) => (
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
                      <Button color="primary" variant="solid" onPress={() => console.log('teste')}>Editar</Button>
                      <Button color="danger" variant="bordered" onPress={() => console.log('teste')}>Excluir</Button>
                    </CardFooter>
                  </Card>
              ))}
          </div>
      </section>
      <Footer />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">Novo cliente</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                  <Input label="Nome" type="text" name="name" id="name" isRequired />
                  <Input label="Email" type="email" name="email" id="email" isRequired />
                  <Input label="Data de nascimento" type="date" name="bornDate" id="bornDate" isRequired />
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
