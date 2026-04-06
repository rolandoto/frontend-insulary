import { CiCalendar } from "react-icons/ci";
import { memo, useMemo } from "react";

const REVENUE = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 3100 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 2800 },
  { month: "Ago", revenue: 3600 },
  { month: "Sep", revenue: 3900 },
  { month: "Oct", revenue: 3400 },
  { month: "Nov", revenue: 3000 },
  { month: "Dic", revenue: 4800 },
];

const CHART_HEIGHT = 320;

const generateYAxis = (revenue) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

function RevenueChartComponent() {
  const { yAxisLabels, topLabel } = useMemo(() => generateYAxis(REVENUE), []);

  if (!REVENUE.length) {
    return <p className="mt-4 text-slate-400">No hay datos disponibles.</p>;
  }

  return (
    <section className="w-full md:col-span-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Rendimiento mensual</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Últimos 12 meses</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-12 items-end gap-2 rounded-xl bg-slate-50/70 p-4 md:gap-3">
          <div className="mb-6 hidden flex-col justify-between text-sm text-slate-400 sm:flex" style={{ height: `${CHART_HEIGHT}px` }}>
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          {REVENUE.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-gradient-to-b from-sky-400 to-blue-600 transition hover:brightness-105"
                style={{ height: `${(CHART_HEIGHT / topLabel) * month.revenue}px` }}
                title={`${month.month}: ${month.revenue}`}
              />
              <p className="text-xs text-slate-500 sm:text-sm">{month.month}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center pb-1 pt-5">
          <CiCalendar className="h-5 w-5 text-slate-500" />
          <h3 className="ml-2 text-sm text-slate-500">Actualizado automáticamente</h3>
        </div>
      </div>
    </section>
  );
}

export default memo(RevenueChartComponent);
