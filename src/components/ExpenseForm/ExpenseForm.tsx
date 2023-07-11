'use client';

import { forwardRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { Database, ExpensesRow } from '../../utils/database.types';
import { useLoading } from '../../hooks/useLoading';
import { useRouter } from 'next/navigation';
import './DialogContainer.css';

interface FormData {
  details: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseFormProps {
  action: 'add' | 'edit' | 'copy';
  selectedExpense?: ExpensesRow;
}

export const ExpenseForm = forwardRef<HTMLDialogElement, ExpenseFormProps>(
  function ExpenseFormRef({ action, selectedExpense }, ref) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();
    const {
      register,
      handleSubmit,
      reset: resetFields,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues:
        action === 'add'
          ? {
              date: new Date().toISOString().split('T')[0],
            }
          : {
              amount: selectedExpense?.amount,
              category: selectedExpense?.category,
              date: selectedExpense?.date,
              details: selectedExpense?.details,
            },
    });
    const { apiStatus, setPending, setResolved, setRejected } = useLoading();
    const handleOnClose = () => {
      if (ref !== null && typeof ref !== 'function') {
        resetFields();
        ref.current?.close();
      }
    };

    const apiRequest = async (formData: FormData) => {
      if (action === 'add' || action === 'copy') {
        const { error } = await supabase.from('expenses').insert(formData);

        return error;
      } else if (action === 'edit') {
        const { error } = await supabase
          .from('expenses')
          .update(formData)
          .eq('id', selectedExpense?.id);

        return error;
      }
    };

    const onSubmit = handleSubmit(async (data) => {
      setPending();
      const formData: typeof data = {
        ...data,
        amount: Number(data.amount),
      };
      const error = await apiRequest(formData);

      if (error) {
        setRejected();
        throw new Error(error.message);
      }

      setResolved();
      router.refresh();
      handleOnClose();
    });

    return (
      <dialog ref={ref} className="w-[350px] bg-gray-950 text-white">
        <h2 className="text-xl">{action.toUpperCase()}</h2>
        <form onSubmit={onSubmit} className="p-3">
          <div className="grid gap-y-3">
            <label htmlFor="details">Details</label>
            <textarea
              className="bg-gray-950 border border-gray-700 px-2 py-1 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              id="details"
              {...register('details', {
                required: 'Details is required',
              })}
            />
            {errors.details && (
              <p className="text-red-700" role="alert">
                {errors.details.message}
              </p>
            )}
            <label htmlFor="amount">Amount</label>
            <input
              className="bg-gray-950 border border-gray-700 px-2 py-1 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              type="number"
              id="amount"
              {...register('amount', {
                required: 'Amount is required',
              })}
            />
            {errors.amount && (
              <p className="text-red-700" role="alert">
                {errors.amount.message}
              </p>
            )}
            <label htmlFor="category">Category</label>
            <select
              className="bg-gray-950 border border-gray-700 px-2 py-1 rounded-md"
              id="category"
              {...register('category', {
                required: 'Category is required',
              })}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-700" role="alert">
                {errors.category.message}
              </p>
            )}
            <label htmlFor="date">Date</label>
            <input
              className="bg-gray-950 border border-gray-700 px-2 py-1 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              type="date"
              id="date"
              {...register('date', {
                required: 'Date is required',
              })}
            />
            {errors.date && (
              <p className="text-red-700" role="alert">
                {errors.date.message}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`px-2 py-1 rounded-md bg-red-600 hover:bg-red-700${
                  apiStatus === 'pending'
                    ? ' cursor-not-allowed disabled:bg-red-900'
                    : ''
                }`}
                disabled={apiStatus === 'pending'}
                onClick={handleOnClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700${
                  apiStatus === 'pending'
                    ? ' cursor-not-allowed disabled:bg-red-900'
                    : ''
                }`}
              >
                Submit
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
          </div>
        </form>
      </dialog>
    );
  }
);

const CATEGORIES = [
  'Dining Out',
  'Groceries',
  'Fun Money',
  'Toiletries / Supplies',
  'Internet Bill',
  'Clothing',
  'Gifts',
  'Cash for mom',
  'Others/Miscellaneous',
  'Transport Commute',
  'Sunlife insurance',
];
