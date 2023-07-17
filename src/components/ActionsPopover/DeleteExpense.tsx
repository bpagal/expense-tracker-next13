'use client';

import { forwardRef } from 'react';
import './DeleteExpense.css';
import { Database, ExpensesRow } from '../../utils/database.types';
import { useRouter } from 'next/navigation';
import { useLoading } from '../../hooks/useLoading';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface DeleteExpenseProps {
  selectedExpense: ExpensesRow;
}

export const DeleteExpense = forwardRef<HTMLDialogElement, DeleteExpenseProps>(
  function DeleteExpenseRef({ selectedExpense }, ref) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();
    const { apiStatus, setPending, setResolved, setRejected } = useLoading();

    const handleOnClose = () => {
      if (ref !== null && typeof ref !== 'function') {
        ref.current?.close();
      }
    };

    const handleDelete = async () => {
      setPending();
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', selectedExpense.id);

      if (error) {
        setRejected();
        throw new Error(error.message);
      }

      setResolved();
      router.refresh();
      handleOnClose();
    };

    return (
      <dialog ref={ref} className="w-[280px] bg-gray-950 text-white ">
        <h2 className="mb-4 font-semibold">
          Delete expense: {selectedExpense.details}?
        </h2>
        <div className="grid grid-cols-2 gap-x-4">
          <button
            type="button"
            className={`px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700${
              apiStatus === 'pending'
                ? ' cursor-not-allowed disabled:bg-blue-900'
                : ''
            }`}
            disabled={apiStatus === 'pending'}
            onClick={handleOnClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`px-2 py-1 rounded-md bg-red-600 hover:bg-red-700${
              apiStatus === 'pending'
                ? ' cursor-not-allowed disabled:bg-red-900'
                : ''
            }`}
            disabled={apiStatus === 'pending'}
            onClick={handleDelete}
          >
            Delete
            {apiStatus === 'pending' && (
              <div
                className="ml-1 animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </dialog>
    );
  }
);
