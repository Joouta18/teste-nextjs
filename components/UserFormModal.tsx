"use client";

import { useEffect, useRef } from "react";
import { User } from "@/types";

interface FormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  companyName: string;
}

interface UserFormModalProps {
  mode: "create" | "edit";
  user?: User;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

export default function UserFormModal({ mode, user, onSubmit, onClose }: UserFormModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onClose();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    onSubmit({
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      companyName: (form.elements.namedItem("companyName") as HTMLInputElement).value,
    });
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm rounded-2xl shadow-2xl p-0 w-full max-w-lg m-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            {mode === "create" ? "Novo Servidor" : "Editar Servidor"}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
              <input name="name" defaultValue={user?.name} className="input-field" required placeholder="Ex: João da Silva" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input name="email" type="email" defaultValue={user?.email} className="input-field" required placeholder="joao@prefeitura.gov.br" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input name="phone" defaultValue={user?.phone} className="input-field" placeholder="(21) 99999-9999" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input name="website" defaultValue={user?.website} className="input-field" placeholder="site.com.br" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input name="city" defaultValue={user?.address?.city} className="input-field" placeholder="Belford Roxo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empresa / Secretaria</label>
              <input name="companyName" defaultValue={user?.company?.name} className="input-field" placeholder="Sec. de Tecnologia" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancelar</button>
            <button type="submit" className="btn-primary flex-1">
              {mode === "create" ? "Criar Servidor" : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
