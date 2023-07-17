'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { YearsMonths } from '../../utils/database.types';

interface DropdownProps {
  // yearsMonths: YearsMonths[];
  label: string;
  items: number[] | string[];
  searchParams: {
    activeParam: string;
    name: string;
    otherParams: string;
  };
}

export default function DropdownLinks({
  items,
  label,
  searchParams,
}: DropdownProps) {
  const [isDropdownOpen, setOpenDropdown] = useState(false);
  const ref = useOutsideClick(() => {
    setOpenDropdown(false);
  });
  const handleOutsideClickStopPropagation = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  return (
    <div className="relative" onClick={handleOutsideClickStopPropagation}>
      <label className="block mb-2" htmlFor={label}>
        {label}
      </label>
      <button
        id={label}
        name="date"
        className="px-2 py-1 border border-gray-700"
        type="button"
        onClick={() => setOpenDropdown(true)}
      >
        {searchParams.activeParam}
      </button>
      {isDropdownOpen && (
        <ul
          className="absolute list-none p-0 border border-gray-600 z-50 bg-gray-800"
          ref={ref}
        >
          {items.map((item) => (
            <li key={item} className="px-2 py-1 menu-item hover:bg-gray-900">
              <Link
                onClick={() => setOpenDropdown(false)}
                // href={`/expenses/monthly?page=1&selectedDate=${elem}`}
                href={{
                  href: '/expenses/monthly',
                  search: `${searchParams.otherParams}&${searchParams.name}=${item}`,
                }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
