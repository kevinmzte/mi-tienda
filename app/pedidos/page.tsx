"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Plus,
  ClipboardList,
} from "lucide-react";

export default function PedidosPage() {

  const pedidos = [];

  return (
    <main className="min-h-screen bg-[#f5f5f7] p-4 pb-24">

      <div className="max-w-md mx-auto">

        {/* TOP */}
        <div className="flex items-center justify-between mb-6">

          <Link
            href="/"
            className="
              bg-white
              px-5
              py-3
              rounded-2xl
              shadow-sm
              flex
              items-center
              gap-2
              active:scale-95
              transition-all
            "
          >
            <ArrowLeft size={18} />
            Volver
          </Link>

          <p
            className="
              text-xl font-bold
              px-10
            "
          >
            Sincronizado con WhatsApp
          </p>

        </div>

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold">
            Pedidos
          </h1>

          <p className="text-gray-500 mt-1">
            Gestiona pedidos y clientes
          </p>

        </div>

        {/* EMPTY */}
        {pedidos.length === 0 ? (

          <section
            className="
              bg-white
              rounded-[32px]
              p-10
              shadow-sm
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >

            <div className="bg-[#f3eefc] p-6 rounded-full">

              <ClipboardList
                size={48}
                className="text-purple-600"
              />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              No hay pedidos
            </h2>

            <p className="text-gray-500 mt-2">
              Los nuevos pedidos aparecerán aquí.
            </p>

          </section>

        ) : (

          <div className="space-y-4">

            {/* LISTA PEDIDOS */}
            

          </div>

        )}

      </div>

    </main>
  );
}