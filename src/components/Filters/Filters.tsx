'use client';

import { useState } from 'react';
import { YearsMonths } from '../../utils/database.types';
import { useRouter } from 'next/navigation';

interface FiltersProps {
  yearsMonths: YearsMonths[];
}

export default function Filters({ yearsMonths }: FiltersProps) {
  const router = useRouter();

  return (
    <div className="flex">
      <select
        onChange={(e) => {
          router.push(
            `/expenses/monthly?page=1&selectedDate=${e.target.value}`
          );
        }}
        className="bg-gray-950 border border-gray-700 px-2 py-1 rounded-md"
      >
        {yearsMonths.map((yearsMonth) => (
          <option key={yearsMonth.years_months} value={yearsMonth.years_months}>
            {yearsMonth.years_months}
          </option>
        ))}
      </select>
    </div>
  );
}
