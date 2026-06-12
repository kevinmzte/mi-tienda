"use client";

import AuthGuard from "@/components/AuthGuard";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ChevronLeft,
  Eye,
  ImagePlus,
  Package,
  DollarSign,
  Boxes,
  FileText,
  Tag,
  AlertTriangle,
} from "lucide-react";

export default function NuevoProductoPage() {

  const router = useRouter();

  const [image, setImage] =
    useState<string>("");

  const [nombre, setNombre] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [showErrorModal, setShowErrorModal] =
    useState(false);
  
  const [errorMessage, setErrorMessage] =
    useState("");

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setImage(reader.result as string);

    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (
  e: React.FormEvent
) => {

  e.preventDefault();

  if (
    !nombre.trim() ||
    !precio.trim() ||
    !stock.trim() ||
    !categoria.trim() ||
    !descripcion.trim()
  ) {

    setErrorMessage(
      "Completa todos los campos obligatorios."
    );

    setShowErrorModal(true);

    return;

  }

  if (!image) {

    setErrorMessage(
      "Debes agregar una imagen del producto."
    );

    setShowErrorModal(true);

    return;

  }

  // precio inválido
  if (Number(precio) <= 0) {

    setErrorMessage(
      "El precio debe ser mayor a cero."
    );

    setShowErrorModal(true);

    return;

  }

  // stock inválido
  if (Number(stock) < 0) {

    setErrorMessage(
      "El stock no puede ser negativo."
    );

    setShowErrorModal(true);

    return;

  }

  const existingProducts = JSON.parse(
    localStorage.getItem("products") || "[]"
  );

  const newProduct = {
    id: Date.now(),
    nombre,
    precio,
    stock,
    categoria,
    descripcion,
    image,
  };

  localStorage.setItem(
    "products",
    JSON.stringify([
      ...existingProducts,
      newProduct,
    ])
  );

  router.push("/productos");
};

  return (
    <AuthGuard>
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
            <ChevronLeft size={18} />
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
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          {/* FOTO */}
          <label
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
              overflow-hidden
              cursor-pointer
            "
          >

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {image ? (

              <Image
                src={image}
                alt="Producto"
                width={300}
                height={300}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            ) : (

              <>
                <ImagePlus
                  size={42}
                  className="text-gray-400"
                />

                <span className="mt-3 text-gray-500 font-medium">
                  Agregar foto
                </span>
              </>

            )}

          </label>

          {/* NOMBRE */}
          <InputCard
            icon={<Package size={20} />}
            placeholder="Nombre del producto"
            value={nombre}
            onChange={setNombre}
          />

          {/* PRECIO */}
          <InputCard
            icon={<DollarSign size={20} />}
            placeholder="Precio"
            type="number"
            value={precio}
            onChange={setPrecio}
          />

          {/* STOCK */}
          <InputCard
            icon={<Boxes size={20} />}
            placeholder="Cantidad en stock"
            type="number"
            value={stock}
            onChange={setStock}
          />

          {/* CATEGORIA */}
          <InputCard
            icon={<Tag size={20} />}
            placeholder="Categoría"
            value={categoria}
            onChange={setCategoria}
          />

          {/* DESCRIPCION */}
          <div className="bg-white rounded-[28px] p-4 shadow-sm">

            <div className="flex items-start gap-3">

              <FileText
                size={20}
                className="text-gray-400 mt-1"
              />

              <textarea
                required
                value={descripcion}
                onChange={(e) =>
                  setDescripcion(e.target.value)
                }
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

      {showErrorModal && (

      <div
        className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          p-4
        "
      >

        <div
          className="
            bg-white
            rounded-[32px]
            p-6
            w-full
            max-w-sm
            text-center
          "
        >

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
              mx-auto
            "
          >
            <AlertTriangle
            size={22}
            className="text-orange-600"
          />
          </div>

          <h2 className="text-2xl font-bold mt-5">
            Datos incompletos
          </h2>

          <p className="text-gray-500 mt-3">
            {errorMessage}
          </p>

          <button
            onClick={() =>
              setShowErrorModal(false)
            }
            className="
              w-full
              bg-green-600
              text-white
              rounded-2xl
              p-4
              mt-6
              font-semibold
            "
          >
            Entendido
          </button>

        </div>

      </div>

      )}

    </main>
    </AuthGuard>
  );
}

type InputProps = {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

function InputCard({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) {

  return (
    <div className="bg-white rounded-[28px] p-4 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="text-gray-400">
          {icon}
        </div>

        <input
          required
          type={type}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
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