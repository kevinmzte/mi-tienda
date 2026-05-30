"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
  useState("");

  const handleLogin = (
    e: React.FormEvent
  ) => {
  
    e.preventDefault();
  
    setError("");
  
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
  
    // NO EXISTE USUARIO
    if (username !== user.username) {
  
      setError("La cuenta no existe");
  
      return;
    }
  
    // PASSWORD INCORRECTA
    if (password !== user.password) {
  
      setError("Contraseña incorrecta");
  
      return;
    }
  
    // LOGIN OK
    localStorage.setItem(
      "logged",
      "true"
    );
  
    router.push("/");
  
  };
  return (
    <main className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <Image
            src="/img/mi-tienda.png"
            alt="Logo"
            width={90}
            height={90}
            style={{ height: "auto" }}
            className="mx-auto mb-4"
          />

          <h1 className="text-4xl font-bold">
            Mi Tienda
          </h1>

          <p className="text-gray-500 mt-2">
            Gestiona tu negocio fácil
          </p>

        </div>

        {/* CARD */}
        <section className="bg-white rounded-[32px] p-6 shadow-sm">
        
          <form className="space-y-4" onSubmit={handleLogin}>
          {error && (

          <div
            className="
              bg-red-100
              border
              border-red-300
              text-red-700
              p-4
              rounded-2xl
              text-sm
              font-medium
            "
          >
            {error}
          </div>

          )}
            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Nombre de usuario"
              className="
                w-full
                bg-[#f5f5f7]
                rounded-2xl
                p-4
                outline-none
              "
            />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Contraseña"
              className="
                w-full
                bg-[#f5f5f7]
                rounded-2xl
                p-4
                outline-none
              "
            />

            <button
              type="submit"
              className="
                w-full
                bg-green-600
                text-white
                rounded-2xl
                p-4
                font-semibold
                active:scale-95
                transition-all
              "
            >
              Entrar
            </button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-gray-500">

              ¿No tienes cuenta?{" "}

              <Link
                href="/register"
                className="text-green-600 font-semibold"
              >
                Crear cuenta
              </Link>

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}