"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Eye,
    ImagePlus,
    Package,
    DollarSign,
    Boxes,
    FileText,
    Tag,
  } from "lucide-react";

export default function NuevoProductoPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] p-4 pb-24">
      
      <div className="max-w-md mx-auto">
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

        <Link
        href="/productos"
        className="
            bg-green-600
            text-white
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
        <Eye size={18} />
        Ver Productos
        </Link>

        </div>
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Nuevo Producto
          </h1>

          <p className="text-gray-500 mt-1">
            Agrega productos a tu catálogo
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-4">

          {/* FOTO */}
          <button
            type="button"
            className="
              w-full
              h-52
              bg-white
              rounded-[32px]
              shadow-sm
              flex
              flex-col
              items-center
              justify-center
              border-2
              border-dashed
              border-gray-300
              active:scale-95
              transition-all
            "
          >
            <ImagePlus
              size={42}
              className="text-gray-400"
            />

            <span className="mt-3 text-gray-500 font-medium">
              Agregar foto
            </span>
          </button>

          {/* NOMBRE */}
          <InputCard
            icon={<Package size={20} />}
            placeholder="Nombre del producto"
          />

          {/* PRECIO */}
          <InputCard
            icon={<DollarSign size={20} />}
            placeholder="Precio"
            type="number"
          />

          {/* STOCK */}
          <InputCard
            icon={<Boxes size={20} />}
            placeholder="Cantidad en stock"
            type="number"
          />

          {/* CATEGORIA */}
          <InputCard
            icon={<Tag size={20} />}
            placeholder="Categoría"
          />

          {/* DESCRIPCION */}
          <div className="bg-white rounded-[28px] p-4 shadow-sm">

            <div className="flex items-start gap-3">

              <FileText
                size={20}
                className="text-gray-400 mt-1"
              />

              <textarea
                placeholder="Descripción del producto..."
                className="
                  w-full
                  outline-none
                  resize-none
                  text-lg
                  min-h-[120px]
                "
              />

            </div>

          </div>

          {/* BOTON */}
          <button
            type="submit"
            className="
              w-full
              bg-green-600
              text-white
              rounded-[28px]
              p-5
              text-xl
              font-semibold
              shadow-sm
              hover:bg-green-700
              active:scale-95
              transition-all
            "
          >
            Guardar Producto
          </button>

        </form>

      </div>

    </main>
  );
}

type InputProps = {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
};

function InputCard({
  icon,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div className="bg-white rounded-[28px] p-4 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="text-gray-400">
          {icon}
        </div>

        <input
          type={type}
          placeholder={placeholder}
          className="
            w-full
            outline-none
            text-lg
            bg-transparent
          "
        />

      </div>

    </div>
  );
}