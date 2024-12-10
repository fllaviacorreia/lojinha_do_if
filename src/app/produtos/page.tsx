import Header from "../components/header";
import Footer from "../components/footer";

export default function Produtos() {
  return (
    <div>
      <Header />
      <section className="flex pt-16 items-center justify-center flex-col w-screen h-screen">
      <h1 className="font-semibold text-2xl text-lime-700">Produtos</h1>
      </section>
      <Footer />

    </div>
  );
}
