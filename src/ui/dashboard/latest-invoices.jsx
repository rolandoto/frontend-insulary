import { RxUpdate } from "react-icons/rx";
import { memo } from "react";

const LATEST_INVOICES = [
  {
    amount: "$448.00",
    name: "Michael Novotny",
    image_url: "/customers/michael-novotny.png",
    email: "michael@novotny.com",
    id: "2b9ca263-d070-46a4-b9a7-e25ee6d32c78",
  },
  {
    amount: "$5.00",
    name: "Delba de Oliveira",
    image_url: "/customers/delba-de-oliveira.png",
    email: "delba@oliveira.com",
    id: "701f09a2-52b6-4e0e-80c6-431529b4593c",
  },
  {
    amount: "$345.77",
    name: "Balazs Orban",
    image_url: "/customers/balazs-orban.png",
    email: "balazs@orban.com",
    id: "b1c463be-f102-4375-83f4-7eabd933db34",
  },
  {
    amount: "$345.77",
    name: "Balazs Orban",
    image_url: "/customers/balazs-orban.png",
    email: "balazs@orban.com",
    id: "3acf6c3d-4516-442e-abe3-ec8689f9e338",
  },
  {
    amount: "$542.46",
    name: "Lee Robinson",
    image_url: "/customers/lee-robinson.png",
    email: "lee@robinson.com",
    id: "0c2edd3e-c7ba-4a40-bbdd-530f3c9232f6",
  },
];

const withBaseUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

function LatestInvoicesComponent() {
  return (
    <section className="flex w-full flex-col md:col-span-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Últimos movimientos</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Top clientes</span>
      </div>

      <div className="flex grow flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="rounded-xl bg-slate-50/70 px-5">
          {LATEST_INVOICES.map((invoice, i) => (
            <div
              key={invoice.id}
              className={`flex flex-row items-center justify-between py-4 ${i !== 0 ? "border-t border-slate-200" : ""}`}
            >
              <div className="flex items-center">
                <img
                  src={withBaseUrl(invoice.image_url)}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800 md:text-base">{invoice.name}</p>
                  <p className="hidden text-sm text-slate-500 sm:block">{invoice.email}</p>
                </div>
              </div>
              <p className="truncate text-sm font-semibold text-slate-700 md:text-base">{invoice.amount}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center pb-1 pt-6">
          <RxUpdate className="h-5 w-5 text-slate-500" />
          <h3 className="ml-2 text-sm text-slate-500">Refrescado hace unos segundos</h3>
        </div>
      </div>
    </section>
  );
}

export default memo(LatestInvoicesComponent);
