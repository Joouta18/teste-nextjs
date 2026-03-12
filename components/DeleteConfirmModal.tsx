"use client";

import { useEffect, useRef } from "react";

interface DeleteConfirmModalProps {
  userName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteConfirmModal({ userName, onConfirm, onClose }: DeleteConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm rounded-2xl shadow-2xl p-0 w-full max-w-sm m-auto"
    >
      <div className="p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Excluir servidor</h2>
        <p className="text-sm text-gray-500 mb-6">
          Tem certeza que deseja excluir <strong className="text-gray-800">{userName}</strong>? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancelar</button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </dialog>
  );
}
