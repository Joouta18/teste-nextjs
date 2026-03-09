import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Diretório de Usuários | Prefeitura de Belford Roxo",
    template: "%s | Prefeitura de Belford Roxo",
  },
  description:
    "Sistema interno de diretório de servidores da Secretaria de Ciência, Tecnologia e Inovação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
