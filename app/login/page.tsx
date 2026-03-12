import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/users");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <svg
              className="w-9 h-9 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">
            Prefeitura de Belford Roxo
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Secretaria de Ciência, Tecnologia e Inovação
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Acesso ao Sistema
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Diretório Interno de Servidores
          </p>

          <LoginForm />

          <p className="mt-6 text-xs text-center text-gray-400">
            Ambiente restrito a servidores autorizados
          </p>
        </div>
      </div>
    </main>
  );
}
