"use client";


import {
  useState,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
  useState("");

  const [showPassword, setShowPassword] =
  useState(false);

  const [attempts, setAttempts] =
    useState(0);
    useEffect(() => {

      const logged =
        localStorage.getItem("logged");
    
      if (logged === "true") {
    
        router.push("/");
    
      }
    
    }, [router]);

    const handleLogin = (
      e: React.FormEvent
    ) => {
    
      e.preventDefault();
    
      setError("");
    
      if (
        !username.trim() ||
        !password.trim()
      ) {
    
        setError(
          "Completa usuario y contraseña."
        );
    
        return;
      }
    
      if (username.length < 4) {
    
        setError(
          "El usuario debe tener al menos 4 caracteres."
        );
    
        return;
      }
    
      if (password.length < 6) {
    
        setError(
          "La contraseña debe tener al menos 6 caracteres."
        );
    
        return;
      }
    
      if (attempts >= 5) {
    
        setError(
          "Demasiados intentos fallidos."
        );
    
        return;
      }
    
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );
    
      if (username !== user.username) {
    
        setAttempts(
          (prev) => prev + 1
        );
    
        setError(
          "La cuenta no existe."
        );
    
        return;
      }
    
      if (password !== user.password) {
    
        setAttempts(
          (prev) => prev + 1
        );
    
        setError(
          "Contraseña incorrecta."
        );
    
        return;
      }
    
      setAttempts(0);
    
      localStorage.setItem(
        "logged",
        "true"
      );
    
      localStorage.setItem(
        "loginDate",
        Date.now().toString()
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

            <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
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
                pr-12
                outline-none
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

            </div>

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
              Entrar al Panel
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
      {attempts > 0 && (

        <p
          className="
            text-center
            text-xs
            text-gray-500
            mt-2
          "
        >
          Intentos restantes:
          {" "}
          {5 - attempts}
        </p>

        )}

    </main>
  );
}