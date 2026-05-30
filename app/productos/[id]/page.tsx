"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ImagePlus,
  Package,
  DollarSign,
  Boxes,
  FileText,
  Tag,
  Trash2,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type Producto = {
  id: number;
  nombre: string;
  precio: string;
  stock: string;
  categoria: string;
  descripcion: string;
  image?: string;
};

export default function EditarProductoPage({
  params,
}: Props) {

  const { id } = use(params);

  const router = useRouter();

  const [image, setImage] =
    useState("");

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

  useEffect(() => {

    const products: Producto[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const product = products.find(
      (p) => p.id === Number(id)
    );

    if (!product) return;

    setNombre(product.nombre);
    setPrecio(product.precio);
    setStock(product.stock);
    setCategoria(product.categoria);
    setDescripcion(product.descripcion);
    setImage(product.image || "");

  }, [id]);

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

  const handleSave = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const products: Producto[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const updatedProducts = products.map(
      (product) => {

        if (product.id === Number(id)) {

          return {
            ...product,
            nombre,
            precio,
            stock,
            categoria,
            descripcion,
            image,
          };

        }

        return product;
      }
    );

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    router.push("/productos");
  };

  const handleDelete = () => {

    const products: Producto[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const filteredProducts = products.filter(
      (product) => product.id !== Number(id)
    );

    localStorage.setItem(
      "products",
      JSON.stringify(filteredProducts)
    );

    router.push("/productos");
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] p-4 pb-24">

      <div className="max-w-md mx-auto">

        {/* TOP */}
        <div className="flex items-center justify-between mb-6">

          <Link
            href="/productos"
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
            Volver
          </Link>

          <button
            onClick={handleDelete}
            className="
              bg-red-500
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
            <Trash2 size={18} />
            Eliminar
          </button>

        </div>

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold">
            Editar Producto
          </h1>

          <p className="text-gray-500 mt-1">
            Modifica la información
          </p>

        </div>

        {/* FORM */}
        <form
          className="space-y-4"
          onSubmit={handleSave}
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
                  Cambiar foto
                </span>
              </>

            )}

          </label>

          {/* NOMBRE */}
          <InputCard
            icon={<Package size={20} />}
            value={nombre}
            onChange={setNombre}
            placeholder="Nombre"
          />

          {/* PRECIO */}
          <InputCard
            icon={<DollarSign size={20} />}
            value={precio}
            onChange={setPrecio}
            placeholder="Precio"
            type="number"
          />

          {/* STOCK */}
          <InputCard
            icon={<Boxes size={20} />}
            value={stock}
            onChange={setStock}
            placeholder="Stock"
            type="number"
          />

          {/* CATEGORIA */}
          <InputCard
            icon={<Tag size={20} />}
            value={categoria}
            onChange={setCategoria}
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
                value={descripcion}
                onChange={(e) =>
                  setDescripcion(e.target.value)
                }
                placeholder="Descripción..."
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
              active:scale-95
              transition-all
            "
          >
            Guardar Cambios
          </button>

        </form>

      </div>

    </main>
  );
}

type InputProps = {
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
};

function InputCard({
  icon,
  value,
  onChange,
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