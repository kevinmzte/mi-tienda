import { useRouter } from "next/navigation";
import {
    Store,
    CalendarDays,
  } from "lucide-react";
  
  export default function Header() {
    const router = useRouter();

    const handleLogout = () => {

      localStorage.removeItem("logged");

      router.push("/login");
    };
  
    const fecha = new Date();
  
    const fechaFormateada =
      fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
  
    return (
      <section className="bg-white rounded-[32px] p-6 shadow-sm mb-4">
  
        <div className="flex items-start justify-between">
  
          <div>
  
            <h1 className="text-4xl font-bold tracking-tight">
              Bienvenido 👋
            </h1>
  
            <div className="flex items-center gap-2 mt-4 text-gray-500">
  
              <CalendarDays size={20} />
  
              <span className="text-lg capitalize">
                {fechaFormateada}
              </span>
      
            </div>
            <button
              onClick={handleLogout}
              className="
                mt-2
                inline-flex
                items-center
                gap-2
                bg-white
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
                text-red-500
                shadow-sm
                border
                border-red-100
                hover:bg-red-50
                active:scale-95
                transition-all
              "
            >
              Salir
            </button>
            
          </div>
  
          <div className="flex flex-col items-center">
  
            <div className="bg-green-100 p-4 rounded-full">
              <Store className="text-green-600" size={28} />
            </div>
  
            <span className="font-bold text-xl mt-2">
              Mi Tienda
            </span>
  
            <span className="text-gray-500 text-sm">
              Panel de control
            </span>
  
          </div>
  
        </div>
  
      </section>
    );
  }