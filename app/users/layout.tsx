import { redirect } from "next/navigation";
import { isAuthenticated, getSession } from "@/lib/auth";
import Header from "@/components/Header";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login");
  }

  const userEmail = await getSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Header userEmail={userEmail ?? ""} />
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400">
        Prefeitura de Belford Roxo — Secretaria de Ciência, Tecnologia e
        Inovação
      </footer>
    </div>
  );
}
