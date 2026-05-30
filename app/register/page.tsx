"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  Store,
  User,
  Lock,
} from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  const [store, setStore] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");
    const [showError, setShowError] =
  useState(false);

const [errorMessage, setErrorMessage] =
  useState("");

const [showSuccess, setShowSuccess] =
  useState(false);

  const handleRegister = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const slug = store
      .toLowerCase()
      .replace(/\s+/g, "-");

    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
        password,
        store,
        slug,
      })
    );


    setShowSuccess(true);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div
            className="
              w-20
              h-20
              bg-green-100
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >
            <Store
              size={36}
              className="text-green-600"
            />
          </div>

          <h1 className="text-4xl font-bold">
            Crear cuenta
          </h1>

          <p className="text-gray-500 mt-2">
            Comienza a vender en minutos
          </p>

        </div>

        {/* CARD */}
        <section className="bg-white rounded-[32px] p-6 shadow-sm">

          <form
            className="space-y-4"
            onSubmit={handleRegister}
          >

            {/* TIENDA */}
            <InputCard
              icon={<Store size={20} />}
              placeholder="Nombre de la tienda"
              value={store}
              onChange={setStore}
            />

            {/* USERNAME */}
            <InputCard
              icon={<User size={20} />}
              placeholder="Nombre de usuario"
              value={username}
              onChange={setUsername}
            />

            {/* PASSWORD */}
            <InputCard
              icon={<Lock size={20} />}
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={setPassword}
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full
                bg-green-600
                text-white
                rounded-2xl
                p-4
                font-semibold
                text-lg
                active:scale-95
                transition-all
              "
            >
              Crear cuenta
            </button>

          </form>

          {/* LOGIN */}
          <div className="mt-6 text-center">

            <p className="text-gray-500">

              ¿Ya tienes cuenta?{" "}

              <Link
                href="/login"
                className="text-green-600 font-semibold"
              >
                Iniciar sesión
              </Link>

            </p>

          </div>

        </section>

      </div>
      {/* ERROR MODAL */}
{showError && (

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
        w-16
        h-16
        rounded-full
        bg-red-100
        flex
        items-center
        justify-center
        mx-auto
      "
    >
      ❌
    </div>

    <h2 className="text-2xl font-bold mt-5">
      Ocurrió un error
    </h2>

    <p className="text-gray-500 mt-2">
      {errorMessage}
    </p>

    <button
      onClick={() =>
        setShowError(false)
      }
      className="
        w-full
        bg-red-500
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

{/* SUCCESS MODAL */}
{showSuccess && (

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
        w-16
        h-16
        rounded-full
        bg-green-100
        flex
        items-center
        justify-center
        mx-auto
      "
    >
      ✅
    </div>

    <h2 className="text-2xl font-bold mt-5">
      Cuenta creada
    </h2>

    <p className="text-gray-500 mt-2">
      Tu cuenta fue registrada correctamente.
    </p>

    <button
      onClick={() => {

        setShowSuccess(false);
    
        router.push("/login");
    
      }}
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
      Continuar
    </button>

  </div>

</div>

)}

    </main>
  );
}

type InputProps = {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

function InputCard({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: InputProps) {
  return (
    <div
      className="
        bg-[#f5f5f7]
        rounded-2xl
        p-4
        flex
        items-center
        gap-3
      "
    >

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
          bg-transparent
          outline-none
          text-[16px]
        "
      />

    </div>
  );
}