"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  Store,
  User,
  Lock,
  Check,
  XCircle,
  Phone,
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

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");


  const handleRegister = (
    e: React.FormEvent
  ) => {
  
    e.preventDefault();
  
    const cleanStore =
      store.trim();
  
    const cleanUsername =
      username.trim();
  
    const cleanPassword =
      password.trim();

    const cleanPhone =
      phone.trim();
  
    // campos vacíos
    if (
      !cleanStore ||
      !cleanUsername ||
      !cleanPassword
    ) {
  
      setErrorMessage(
        "Completa todos los campos."
      );
  
      setShowError(true);
  
      return;
    }
  
    // tienda muy corta
    if (cleanStore.length < 3) {
  
      setErrorMessage(
        "El nombre de la tienda debe tener al menos 3 caracteres."
      );
  
      setShowError(true);
  
      return;
    }
  
    // usuario muy corto
    if (cleanUsername.length < 4) {
  
      setErrorMessage(
        "El usuario debe tener al menos 4 caracteres."
      );
  
      setShowError(true);
  
      return;
    }
  
    // solo letras, números y _
    if (
      !/^[a-zA-Z0-9_]+$/.test(
        cleanUsername
      )
    ) {
  
      setErrorMessage(
        "El usuario solo puede contener letras, números y guiones bajos."
      );
  
      setShowError(true);
  
      return;
    }
  
          // contraseña mínima
      if (cleanPassword.length < 6) {

        setErrorMessage(
          "La contraseña debe tener al menos 6 caracteres."
        );

        setShowError(true);

        return;
      }

      if (
        !/[a-zA-Z0-9]/.test(cleanStore)
      ) {
      
        setErrorMessage(
          "Ingresa un nombre de tienda válido."
        );
      
        setShowError(true);
      
        return;
      }

      // confirmar contraseña
      if (
        cleanPassword !==
        confirmPassword.trim()
      ) {

        setErrorMessage(
          "Las contraseñas no coinciden."
        );

        setShowError(true);

        return;
      }
      if (!cleanPhone) {

        setErrorMessage(
          "Ingresa un número de WhatsApp."
        );
      
        setShowError(true);
      
        return;
      }

      if (
        !/^\d+$/.test(cleanPhone)
      ) {
      
        setErrorMessage(
          "El teléfono solo puede contener números."
        );
      
        setShowError(true);
      
        return;
      }
      if (
        cleanPhone.length < 10
      ) {
      
        setErrorMessage(
          "Ingresa un número válido."
        );
      
        setShowError(true);
      
        return;
      }
  
    const existingUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );
  
    // usuario ya registrado
    if (
      existingUser &&
      existingUser.username ===
        cleanUsername
    ) {
  
      setErrorMessage(
        "Ese nombre de usuario ya está registrado."
      );
  
      setShowError(true);
  
      return;
    }
  
    const slug = cleanStore
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: cleanUsername,
          password: cleanPassword,
          store: cleanStore,
          phone: cleanPhone,
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
            <InputCard
              icon={<Lock size={20} />}
              placeholder="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

          <InputCard
            icon={<Phone size={20} />}
            placeholder="WhatsApp (Ej: 595981123456)"
            value={phone}
            onChange={setPhone}
            type="tel"
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
      <XCircle
        size={40}
        className="text-red-500"
      />
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
      <Check size={18} />
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
          onChange(
            e.target.value.replace(/^\s+/, "")
          )
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