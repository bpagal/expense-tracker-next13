import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expenses Home',
};

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
