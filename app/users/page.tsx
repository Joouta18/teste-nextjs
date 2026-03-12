"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@/types";
import {
  seedLocalStorage,
  getUsersFromStorage,
  createUser,
} from "@/lib/api";
import UserFormModal from "@/components/UserFormModal";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    seedLocalStorage()
      .then(() => setUsers(getUsersFromStorage()))
      .catch(() => setError("Não foi possível carregar a lista de usuários."))
      .finally(() => setLoading(false));
  }, []);

  function handleCreate(data: {
    name: string;
    email: string;
    phone: string;
    website: string;
    city: string;
    companyName: string;
  }) {
    createUser(data);
    setUsers(getUsersFromStorage());
    setModalOpen(false);
  }

  if (loading) {
    return (
      <section aria-busy="true" aria-label="Carregando usuários">
        <div className="mb-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-2" />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="card p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (error) {
    return (
      <section aria-live="polite">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Erro ao carregar dados</h2>
          <p className="text-gray-500 text-sm max-w-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Diretório de Servidores</h1>
          <p className="text-sm text-gray-500 mt-1">{users.length} servidores cadastrados</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo Servidor
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              href={`/users/${user.id}`}
              className="card block p-5 group"
              aria-label={`Ver detalhes de ${user.name}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm shrink-0"
                  aria-hidden="true"
                >
                  {user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-gray-900 text-sm leading-tight truncate group-hover:text-brand-blue transition-colors">
                    {user.name}
                  </h2>
                  <p className="text-xs text-gray-400">@{user.username}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  <span className="truncate text-xs text-gray-500">{user.company.name}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">{user.address.city}</span>
                <span className="text-xs text-[#1a56a0] font-medium group-hover:underline">Ver detalhes →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <UserFormModal
          mode="create"
          onSubmit={handleCreate}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
