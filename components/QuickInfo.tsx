"use client";

import {
  ChevronRight,
  Package,
  MessageCircle,
  AlertTriangle,
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
        icon={
          <Package
            size={22}
            className="text-purple-600"
          />
        }
        text={`${pedidosPendientes} pedidos pendientes`}
        bg="bg-purple-50"
      />

      <InfoCard
        icon={
          <MessageCircle
            size={22}
            className="text-blue-600"
          />
        }
        text={`${clientesEsperando} clientes esperando respuesta`}
        bg="bg-blue-50"
      />

      <InfoCard
        icon={
          <AlertTriangle
            size={22}
            className="text-orange-600"
          />
        }
        text={`${productosBajoStock} productos con bajo stock`}
        bg="bg-orange-50"
      />

      </div>

    </section>

  );

}

type CardProps = {
  icon: React.ReactNode;
  text: string;
  bg: string;
};

function InfoCard({
  icon,
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

    <div
      className="
        w-10
        h-10
        rounded-xl
        bg-white
        flex
        items-center
        justify-center
        shadow-sm
      "
    >
      {icon}
    </div>

      <span className="font-medium text-[16px]">
        {text}
      </span>

    </div>

  );

}