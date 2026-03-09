export default function UserDetailLoading() {
  return (
    <section aria-busy="true" aria-label="Carregando detalhes do usuário">
      <div className="mb-6">
        <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      <div className="max-w-2xl">
        <div className="card p-6 mb-4 animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0" />
            <div className="space-y-2">
              <div className="h-5 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="py-3 border-b border-gray-100">
                <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-48 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 animate-pulse">
          <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
          <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>
      </div>
    </section>
  );
}
