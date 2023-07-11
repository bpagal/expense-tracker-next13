'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { YearsMonths } from '../../utils/database.types';
import DropdownLinks from '../DropdownLinks/DropdownLinks';

export default function Filters() {
  const searchParams = useSearchParams();
  const paramYear = searchParams.get('year');
  const paramMonth = searchParams.get('month');
  const years = ['2023', '2022', '2021', '2020'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="flex gap-x-4">
      <DropdownLinks
        items={years}
        label="Year"
        searchParams={{
          activeParam: paramYear ?? '',
          name: 'year',
          otherParams: `page=1&month=${paramMonth}`,
        }}
      />
      <DropdownLinks
        items={months}
        label="Month"
        searchParams={{
          activeParam: paramMonth ?? '',
          name: 'month',
          otherParams: `page=1&year=${paramYear}`,
        }}
      />
    </div>
  );
}
