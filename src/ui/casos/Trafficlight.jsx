
const etapasOrdenadas = ["IP", "IS", "IF", "IA"];

const obtenerInfoDesdeNombre = (nombre) => {
  if (!nombre) return { etapa: null, color: "bg-gray-500" };

  const esPendiente = nombre.includes("Pendiente");
  const esEnviado = nombre.includes("Enviado");

  const etapa = etapasOrdenadas.find((etapa) => nombre.includes(`- ${etapa}`));

  let color = "bg-gray-500";
  if (esPendiente) color = "bg-yellow-400";
  if (esEnviado) color = "bg-green-400";

  return { etapa, color };
};

const SemaforoEstado = ({ nombreEstado }) => {
  const { etapa, color } = obtenerInfoDesdeNombre(nombreEstado);

  const indexEtapa = etapasOrdenadas.indexOf(etapa);

  return (
    <td className="whitespace-nowrap px-3 py-3">
      <div className="flex flex-col items-center">

        <div className="flex items-center justify-center space-x-2 bg-gray-800 rounded-full px-2 py-1 shadow-inner">
          {etapasOrdenadas.map((etapaItem, idx) => {
            const isOn = idx <= indexEtapa;
            const bgColor = isOn ? color : "bg-gray-500";

            return (
              <div
                key={etapaItem}
                className={`w-4 h-4 rounded-full border border-gray-600 ${bgColor}`}
              ></div>
            );
          })}
        </div>

        <div className="flex justify-between text-[10px] text-black mt-1 w-full px-1 font-semibold">
          {etapasOrdenadas.map((e) => (
            <span key={e} className="w-4 text-center">{e}</span>
          ))}
        </div>
      </div>
    </td>
  );
};

export default  SemaforoEstado