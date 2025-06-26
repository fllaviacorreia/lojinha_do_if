import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-screen flex-row items-center justify-between">
        <div className="w-2/3 h-dvh bg-violet-800"></div>
        <main className="w-1/3 h-dvh p-8">
            {children}
        </main>
    </section>
  );
}