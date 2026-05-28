import {
  ChevronRight,
} from "lucide-react";

export default function QuickInfo() {
  return (
    <section
      className="
        bg-white
        rounded-[32px]
        p-5
        mt-4
        shadow-sm
      "
    >

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div>

          <h3 className="font-bold text-2xl">
            Actividad de hoy
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Resumen rápido del negocio
          </p>

        </div>

        <ChevronRight className="text-gray-400" />

      </div>

      {/* ITEMS */}
      <div className="space-y-3 mt-6">

        <InfoCard
          emoji="📦"
          text="8 pedidos pendientes"
          bg="bg-purple-50"
        />

        <InfoCard
          emoji="💬"
          text="3 clientes esperando respuesta"
          bg="bg-blue-50"
        />

        <InfoCard
          emoji="⚠️"
          text="12 productos con bajo stock"
          bg="bg-orange-50"
        />

      </div>

    </section>
  );
}

type Props = {
  emoji: string;
  text: string;
  bg: string;
};

function InfoCard({
  emoji,
  text,
  bg,
}: Props) {
  return (
    <div
      className={`
        ${bg}
        rounded-2xl
        p-4
        flex
        items-center
        gap-3
      `}
    >

      <span className="text-2xl">
        {emoji}
      </span>

      <span className="font-medium text-[16px]">
        {text}
      </span>

    </div>
  );
}