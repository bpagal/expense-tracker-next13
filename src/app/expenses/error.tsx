'use client';

export default function ExpensesError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center text-2xl">
      <h2 className="text-red-600">Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
