import {
    Store,
    CalendarDays,
  } from "lucide-react";
  
  export default function Header() {
    return (
      <section className="bg-white rounded-[32px] p-6 shadow-sm mb-4">
        <div className="flex items-start justify-between">
  
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Hola Kevin 👋
            </h1>
  
            <div className="flex items-center gap-2 mt-4 text-gray-500">
              <CalendarDays size={20} />
  
              <span className="text-lg">
                26 de mayo de 2026
              </span>
            </div>
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