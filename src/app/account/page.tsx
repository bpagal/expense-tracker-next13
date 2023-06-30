import Link from 'next/link';

export default function Page() {
  return (
    <div className="text-xl text-white">
      <h2>This is the Account page</h2>
      <div>
        <Link className="font-semibold text-blue-500" href="/">
          Home Login
        </Link>
      </div>
      <Link className="font-semibold text-blue-500" href="/expenses">
        Expenses
      </Link>
    </div>
  );
}
