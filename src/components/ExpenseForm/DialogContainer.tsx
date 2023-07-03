'use client';

import { useRef } from 'react';
import './DialogContainer.css';
import { ExpenseForm } from './ExpenseForm';

export function DialogContainer() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-md"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        Add
      </button>
      <ExpenseForm ref={dialogRef} />
    </>
  );
}
