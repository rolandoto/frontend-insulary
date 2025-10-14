
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useLocation, useNavigate, useSearchParams } from "react-router"; // usa react-router-dom, no "react-router"
import {useDebouncedCallback} from  "use-debounce"


function EstadoIcon({ estado }) {
  const color =
    estado === "Pendiente" ? "bg-yellow-400" :
    estado === "Enviado" ? "bg-green-500" :
    "bg-gray-400";

  return (
    <span className={`inline-block w-3 h-3 rounded-full ${color}`}></span>
  );
}

const SUGERENCIAS = [
  { label: "Informe Preliminar Pendiente - IP", estado: "Pendiente" },
  { label: "Informe Preliminar Enviado - IP", estado: "Enviado" },
  { label: "Informe Seguimiento Pendiente - IS", estado: "Pendiente" },
  { label: "Informe Seguimiento Enviado - IS", estado: "Enviado" },
  { label: "Informe Final Pendiente - IF", estado: "Pendiente" },
  { label: "Informe Final Enviado - IF", estado: "Enviado" },
  { label: "Informe Alcance Pendiente - IA", estado: "Pendiente" },
  { label: "Informe Alcance Enviado - IA", estado: "Enviado" },
];

export default function Search({ placeholder }) {
   const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [term, setTerm] = useState(searchParams.get("q") || "");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("q", value);
    else params.delete("q");
    params.set("page", "1");
    navigate(`${pathname}?${params.toString()}`, { replace: true });
  }, 300);

   const filtered = term
  ? SUGERENCIAS.filter((s) =>
      s.label.toLowerCase().includes(term.toLowerCase())
    )
  : SUGERENCIAS;


  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
       <input
          id="search"
          type="text"
          autoComplete="off"
          spellCheck="false"
          aria-label="Search"

          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)} // para no cerrar mientras se hace click en sugerencia
          placeholder={placeholder}
          className="peer block w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
        />
        
     {isFocused && filtered.length > 0 && (
  <div className="absolute z-20 mt-12 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
    <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-gray-200">
      Podría interesarte
    </div>
    <ul className=" overflow-y-auto">
      {filtered.map((item, i) => (
        <li
          key={i}
          className="flex items-center justify-between gap-2 px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer transition-colors"
          onMouseDown={() => {
            setTerm(item.label);
            handleSearch(item.label);
          }}
        >
          <span>{item.label}</span>
          <EstadoIcon estado={item.estado} />
        </li>
      ))}
    </ul>
  </div>
)}

      <FaMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}