import { User } from "@/types";

const API_BASE = "https://jsonplaceholder.typicode.com";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Falha ao carregar usuários");
  }

  return res.json();
}

export async function getUserById(id: string): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Usuário não encontrado");
  }

  return res.json();
}
