"use client";

import {
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

type Pedido = {
  id: number;
  estado: string;
};

type Producto = {
  id: number;
  nombre: string;
  stock: number;
};

export default function QuickInfo() {

  const [
    pedidosPendientes,
    setPedidosPendientes,
  ] = useState(0);

  const [
    clientesEsperando,
    setClientesEsperando,
  ] = useState(0);

  const [
    productosBajoStock,
    setProductosBajoStock,
  ] = useState(0);

  useEffect(() => {

    // PEDIDOS
    const orders: Pedido[] = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    // PRODUCTOS
    const products: Producto[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    // pedidos pendientes
    const pendientes =
      orders.filter(
        (order) =>
          order.estado === "pendiente"
      ).length;

    setPedidosPendientes(pendientes);

    // clientes esperando respuesta
    // usamos también pendientes
    setClientesEsperando(pendientes);

    // productos bajo stock
    const bajoStock =
      products.filter(
        (product) =>
          product.stock <= 5
      ).length;

    setProductosBajoStock(bajoStock);

  }, []);

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
          text={`${pedidosPendientes} pedidos pendientes`}
          bg="bg-purple-50"
        />

        <InfoCard
          emoji="💬"
          text={`${clientesEsperando} clientes esperando respuesta`}
          bg="bg-blue-50"
        />

        <InfoCard
          emoji="⚠️"
          text={`${productosBajoStock} productos con bajo stock`}
          bg="bg-orange-50"
        />

      </div>

    </section>

  );

}

type CardProps = {
  emoji: string;
  text: string;
  bg: string;
};

function InfoCard({
  emoji,
  text,
  bg,
}: CardProps) {

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