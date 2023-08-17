import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Expenses Home',
};

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO change this to current year and month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDateFormatted = `year=${currentYear}&month=${currentMonth}`;

  return (
    <section>
      <nav>
        <ul className="px-3 text-lg text-white flex gap-x-4">
          <li>
            <Link
              className="no-underline hover:underline"
              href="/expenses?page=1"
            >
              Expenses
            </Link>
          </li>
          <li>
            <Link
              className="no-underline hover:underline"
              href={`/expenses/monthly?page=1&${currentDateFormatted}`}
            >
              Monthly
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </section>
  );
}
