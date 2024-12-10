import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="flex pt-16 items-center justify-center flex-col w-screen h-screen">
        <h1 className="font-semibold text-2xl text-lime-700">Lojinha do IF</h1>
        <p>Esta é uma aplicação completa para cadastro de Clientes, Produtos e registro de Compras.</p>
      </section>
      <Footer />
    </div>
  );
}
