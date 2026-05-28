import Link from "next/link";

import {
  ArrowLeft,
  Pencil,
  Package,
} from "lucide-react";

export default function ProductosPage() {

  const productos: any[] = [];

  return (
    <main className="min-h-screen bg-[#f5f5f7] p-4">

      <div className="max-w-md mx-auto">

        {/* TOP */}
        <div className="flex items-center justify-between mb-6">

          <Link
            href="/productos/nuevo"
            className="
              bg-white
              px-5
              py-3
              rounded-2xl
              shadow-sm
              flex
              items-center
              gap-2
            "
          >
            <ArrowLeft size={18} />
            Nuevo
          </Link>

          <h1 className="text-3xl font-bold">
            Productos
          </h1>

        </div>

        {/* EMPTY */}
        {productos.length === 0 ? (

          <div
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

            <div className="bg-gray-100 p-6 rounded-full">
              <Package
                size={48}
                className="text-green-600"
              />
            </div>

            <h2 className="text-2xl font-bold mt-6">
              No hay productos
            </h2>

            <p className="text-gray-500 mt-2">
              Agrega tu primer producto al catálogo.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {productos.map((producto) => (
              <div key={producto.id}>
                Producto
              </div>
            ))}

          </div>

        )}

      </div>

    </main>
  );
}