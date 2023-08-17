'use client';

import { ResponsivePie } from '@nivo/pie';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
interface ChartData {
  id: string;
  label: string;
  value: number;
}
interface MonthlyChartProps {
  chartData: ChartData[];
}

export default function MonthlyChart({ chartData }: MonthlyChartProps) {
  return (
    <div className="h-[600px]">
      <ResponsivePie
        theme={{
          fontSize: 15,
        }}
        data={chartData}
        colors={{ scheme: 'dark2' }}
        margin={{ top: 40, right: 24, bottom: 80, left: 24 }}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsThickness={2}
        arcLinkLabelsTextColor={{ from: 'color' }}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
      />
    </div>
  );
}
