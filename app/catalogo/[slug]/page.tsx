import Link from "next/link";

import {
  ArrowLeft,
  Share2,
  ShoppingBag,
} from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CatalogoPage({
  params,
}: Props) {

  const { slug } = await params;

  const productos = [];

  return (
    <main className="min-h-screen bg-[#f5f5f7] p-4 pb-24">

      <div className="max-w-md mx-auto">

        {/* TOP BUTTONS */}
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

          <button
            className="
              bg-orange-500
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
            <Share2 size={18} />
            Compartir
          </button>

        </div>

        {/* STORE HEADER */}
        <section className="bg-white rounded-[32px] p-6 shadow-sm mb-4">

          <div className="flex items-center gap-4">

            <div
              className="
                w-16
                h-16
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
              "
            >
              <ShoppingBag
                className="text-orange-500"
                size={30}
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                {slug}
              </h1>

              <p className="text-gray-500 mt-1">
                Catálogo oficial
              </p>

            </div>

          </div>

        </section>
        {/* EMPTY STATE */}
        {productos.length === 0 ? (

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

          <div className="bg-gray-100 p-6 rounded-full">

            <ShoppingBag
              size={48}
              className="text-orange-500"
            />

          </div>

          <h2 className="text-2xl font-bold mt-6">
            No hay productos
          </h2>

          <p className="text-gray-500 mt-2">
            Agrega productos para comenzar a vender.
          </p>

        </section>

        ) : (

    <div className="grid grid-cols-2 gap-4">

      {/* PRODUCTOS */}

    </div>
        )}
      </div>

  
    </main>
  );
}


 