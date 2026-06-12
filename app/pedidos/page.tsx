"use client";

import AuthGuard from "@/components/AuthGuard";
import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ChevronLeft,
  ClipboardList,
  Check,
  MessageCircle,
  X,
} from "lucide-react";

type Pedido = {
  id: number;
  cliente: string;
  telefono: string;
  estado: string;
  total: number;

  productos: {
    id: number;
    nombre: string;
    cantidad: number;
    precio?: number;
  }[];
};

export default function PedidosPage() {

  const [pedidos, setPedidos] =
    useState<Pedido[]>([]);

  useEffect(() => {

    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setPedidos(savedOrders);

  }, []);

  const updateEstado = (
    id: number,
    nuevoEstado: string
  ) => {

    const updated = pedidos.map((pedido) => {

      if (pedido.id === id) {

        return {
          ...pedido,
          estado: nuevoEstado,
        };

      }

      return pedido;

    });

    setPedidos(updated);

    localStorage.setItem(
      "orders",
      JSON.stringify(updated)
    );

  };

  const cancelarPedido = (
    pedidoId: number
  ) => {

    const pedido = pedidos.find(
      (p) => p.id === pedidoId
    );

    if (!pedido) return;

    // productos actuales
    const savedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    // devolver stock
    const updatedProducts =
      savedProducts.map((product: any) => {

        const orderedProduct =
          pedido.productos?.find(
            (item) =>
              item.id === product.id
          );

        if (orderedProduct) {

          return {
            ...product,
            stock:
              product.stock +
              orderedProduct.cantidad,
          };

        }

        return product;

      });

    // guardar productos
    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    // eliminar pedido
    const updatedOrders =
      pedidos.filter(
        (p) => p.id !== pedidoId
      );

    setPedidos(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

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

          <p className="font-bold text-sm text-purple-600">
            WhatsApp conectado
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

            {pedidos.map((pedido) => (

              <section
                key={pedido.id}
                className="
                  bg-white
                  rounded-[28px]
                  p-5
                  shadow-sm
                "
              >

                {/* TOP */}
                <div className="flex justify-between">

                  <div>

                    <h2 className="text-xl font-bold">
                      {pedido.cliente}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {pedido.productos?.length || 0} productos
                    </p>

                  </div>

                  <span
                    className="
                      bg-purple-100
                      text-purple-600
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      h-fit
                    "
                  >
                    {pedido.estado}
                  </span>

                </div>

                {/* PRODUCTOS */}
                <div className="mt-4 space-y-2">

                  {pedido.productos?.map(
                    (producto) => (

                      <div
                        key={producto.id}
                        className="
                          bg-[#f5f5f7]
                          rounded-2xl
                          p-3
                        "
                      >

                        <p className="font-semibold">
                          {producto.cantidad}x{" "}
                          {producto.nombre}
                        </p>

                        <p className="text-sm text-gray-500">
                          ₲ {producto.precio || 0}
                        </p>

                      </div>

                    )
                  )}

                </div>

                {/* TOTAL */}
                <p className="font-bold text-xl mt-4">
                  ₲ {pedido.total || 0}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-5">

                  <a
                    href={`https://wa.me/${pedido.telefono}`}
                    target="_blank"
                    className="
                      flex-1
                      bg-green-100
                      text-green-600
                      p-3
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>

                  {pedido.estado === "confirmado" ? (

                    <div
                      className="
                        flex-1
                        bg-purple-100
                        text-purple-600
                        p-3
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        gap-2
                        font-semibold
                      "
                    >
                      <Check size={18} />
                      Pedido confirmado
                    </div>

                  ) : (

                    <button
                      onClick={() =>
                        updateEstado(
                          pedido.id,
                          "confirmado"
                        )
                      }
                      className="
                        flex-1
                        bg-purple-600
                        text-white
                        p-3
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        gap-2
                        active:scale-95
                        transition-all
                      "
                    >
                      <Check size={18} />
                      Confirmar
                    </button>

                  )}

                </div>

                {/* CANCELAR */}
                {pedido.estado === "confirmado" ? (

                  <button
                    onClick={() =>
                      updateEstado(
                        pedido.id,
                        "pendiente"
                      )
                    }
                    className="
                      w-full
                      mt-3
                      bg-orange-100
                      text-orange-600
                      p-3
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      gap-2
                      active:scale-95
                      transition-all
                    "
                  >

                    <X size={18} />

                    Cancelar confirmación

                  </button>

                ) : (

                  <button
                    onClick={() =>
                      cancelarPedido(
                        pedido.id
                      )
                    }
                    className="
                      w-full
                      mt-3
                      bg-red-100
                      text-red-600
                      p-3
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      gap-2
                      active:scale-95
                      transition-all
                    "
                  >

                    <X size={18} />

                    Cancelar pedido

                  </button>
                )}

              </section>

            ))}

          </div>

        )}

      </div>

    </main>
    </AuthGuard>
  );
}