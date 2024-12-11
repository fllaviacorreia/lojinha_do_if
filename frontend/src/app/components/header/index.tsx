import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-center w-screen h-14 rounded-3xl fixed z-50 top-4 bg-slate-300">
            <nav>
                <ul className="flex row ">
                    
                <li className="mx-2">
                        <Link className="font-semibold" href={"/"}>Home</Link>
                    </li>
                    <li className="mx-2">
                        <Link className="font-semibold" href={"/clientes"}>Clientes</Link>
                    </li>
                    
                    <li className="mx-2">
                        <Link className="font-semibold" href={"/compras"}>Compras</Link>
                    </li>
                    
                    <li className="mx-2">
                        <Link className="font-semibold" href={"/produtos"}>Prdoutos</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}