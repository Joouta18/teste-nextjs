"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "prefeitura_session";
const VALID_PASSWORD = "123456";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !email.includes("@")) {
    return { error: "Informe um e-mail válido." };
  }

  if (password !== VALID_PASSWORD) {
    return { error: "Senha incorreta. Use: 123456" };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  redirect("/users");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}
