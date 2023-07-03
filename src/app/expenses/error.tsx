'use client';

import { useEffect } from 'react';

export default function ExpensesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);

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
