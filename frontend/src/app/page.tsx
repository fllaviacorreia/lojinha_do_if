"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>  
      <div className="container mx-auto p-4">
        <h1 className="text-2xl">Bem-vindo ao nosso site!</h1>
        <p className="mt-4">Esta é a página inicial do nosso site.</p>
        <Link href="/auth/login"> Ir para a página de login</Link>
        <Button>This is a button</Button>
      </div>

    </main>
  );
}
