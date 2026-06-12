"use client";
import AuthGuard from "@/components/AuthGuard";

import {
  useEffect,
  useState,
} from "react";

type CartItem = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  image: string;
};

export default function CarritoPage() {

  const [cart, setCart] =
    useState<CartItem[]>([]);

  useEffect(() => {

    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);

  }, []);

  // ✅ TOTAL
  const total = cart.reduce(
    (acc, item) =>
      acc + item.precio * item.cantidad,
    0
  );

  return (
    <AuthGuard>
    <main>

      {cart.map((item) => (

        <div key={item.id}>

          <h2>{item.nombre}</h2>

          <p>
            {item.cantidad} x ₲ {item.precio}
          </p>

        </div>

      ))}

      {/* TOTAL */}
      <h2>
        Total: ₲ {total}
      </h2>

    </main>
    </AuthGuard>
  );
}