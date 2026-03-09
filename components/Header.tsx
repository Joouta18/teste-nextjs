import { logoutAction } from "@/lib/actions";

interface HeaderProps {
  userEmail: string;
}

export default function Header({ userEmail }: HeaderProps) {
  return (
    <header className="bg-brand-blue text-white shadow-md">
      <div className="container mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6 text-blue-200"
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
          <span className="font-semibold text-sm">
            Diretório de Servidores
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-blue-100 text-sm hidden sm:block">
            {userEmail}
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-blue-100 hover:text-white transition-colors underline underline-offset-2"
            >
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
