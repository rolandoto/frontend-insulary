import { IoTimeOutline } from "react-icons/io5";
import { HiOutlineInbox } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { memo } from "react";

const iconMap = {
  collected: HiOutlineInbox,
  customers: HiOutlineUserGroup,
  pending: HiOutlineBanknotes,
  invoices: IoTimeOutline,
};

const cardTone = {
  collected: "from-blue-600/10 to-indigo-500/5 border-blue-100",
  pending: "from-amber-500/15 to-orange-500/5 border-amber-100",
  invoices: "from-emerald-500/15 to-teal-500/5 border-emerald-100",
  customers: "from-rose-500/10 to-pink-500/5 border-rose-100",
};

const formatNumber = new Intl.NumberFormat("es-CO");

function CardComponent({ title, value, type, subtitle }) {
  const Icon = iconMap[type];
  const tone = cardTone[type] ?? "from-slate-500/10 to-slate-300/5 border-slate-100";

  return (
    <article className={`rounded-2xl border bg-gradient-to-br ${tone} p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}>
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-700">
          {Icon ? <Icon className="h-5 w-5" /> : null}
          <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
        </div>
        <span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-semibold text-slate-500">
          KPI
        </span>
      </header>

      <div className="rounded-xl bg-white/80 p-4 backdrop-blur-sm">
        <p className="text-3xl font-bold tracking-tight text-slate-900">{formatNumber.format(Number(value) || 0)}</p>
        <p className="mt-2 text-xs text-slate-500">{subtitle || "Actualizado en tiempo real"}</p>
      </div>
    </article>
  );
}

export const Card = memo(CardComponent);

export default function CardWrapper() {
  return null;
}
