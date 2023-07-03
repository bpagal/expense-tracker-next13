import { Suspense } from 'react';
import ExpensesLoading from './loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expenses Home',
};

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<ExpensesLoading />}>{children}</Suspense>;
    </div>
  );
}
