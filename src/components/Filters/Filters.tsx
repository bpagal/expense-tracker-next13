'use client';

import { useSearchParams } from 'next/navigation';
import DropdownLinks, { DropdownItems } from '../DropdownLinks/DropdownLinks';

interface FiltersProps {
  years: { years: string }[];
}

export default function Filters({ years }: FiltersProps) {
  const searchParams = useSearchParams();
  const paramYear = searchParams.get('year');
  const paramMonth = searchParams.get('month');
  const yearsItems: DropdownItems[] = years.map((year) => ({
    label: year.years,
    value: year.years,
  }));
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
  const monthsItems: DropdownItems[] = months.map((month, index) => ({
    label: month,
    value: index + 1,
  }));

  return (
    <div className="flex gap-x-4">
      <DropdownLinks
        items={yearsItems}
        label="Year"
        searchParams={{
          name: 'year',
          otherParams: `page=1&month=${paramMonth}`,
        }}
        btnInitialValue={paramYear ?? ''}
      />
      <DropdownLinks
        items={monthsItems}
        label="Month"
        searchParams={{
          name: 'month',
          otherParams: `page=1&year=${paramYear}`,
        }}
        btnInitialValue={months.at(Number(paramMonth) - 1) ?? ''}
      />
    </div>
  );
}
