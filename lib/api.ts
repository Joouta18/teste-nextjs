import { User } from "@/types";

const STORAGE_KEY = "prefeitura_users";
const API_BASE = "https://jsonplaceholder.typicode.com";

export async function seedLocalStorage(): Promise<void> {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(STORAGE_KEY)) return;
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Falha ao carregar usuários");
  const users: User[] = await res.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUsersFromStorage(): User[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsersToStorage(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function createUser(data: {
  name: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  companyName: string;
}): User {
  const users = getUsersFromStorage();
  const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
  const newUser: User = {
    id: maxId + 1,
    name: data.name,
    username: data.name.toLowerCase().replace(/\s+/g, "."),
    email: data.email,
    phone: data.phone,
    website: data.website,
    address: {
      street: "",
      suite: "",
      city: data.city,
      zipcode: "",
      geo: { lat: "0", lng: "0" },
    },
    company: {
      name: data.companyName,
      catchPhrase: "",
      bs: "",
    },
  };
  users.push(newUser);
  saveUsersToStorage(users);
  return newUser;
}

export function updateUser(
  id: string,
  data: {
    name: string;
    email: string;
    phone: string;
    website: string;
    city: string;
    companyName: string;
  }
): User {
  const users = getUsersFromStorage();
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) throw new Error("Usuário não encontrado");
  users[index] = {
    ...users[index],
    name: data.name,
    email: data.email,
    phone: data.phone,
    website: data.website,
    address: { ...users[index].address, city: data.city },
    company: { ...users[index].company, name: data.companyName },
  };
  saveUsersToStorage(users);
  return users[index];
}

export function deleteUser(id: string): void {
  const users = getUsersFromStorage();
  const filtered = users.filter((u) => u.id !== Number(id));
  saveUsersToStorage(filtered);
}
