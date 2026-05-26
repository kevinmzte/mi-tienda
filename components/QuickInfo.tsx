import {
    Store,
    ChevronRight,
  } from "lucide-react";
  
  export default function QuickInfo() {
    return (
      <section
        className="
          bg-white
          rounded-[28px]
          p-5
          mt-4
          shadow-sm
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center gap-4">
  
          <div className="bg-green-100 p-3 rounded-full">
            <Store className="text-green-600" />
          </div>
  
          <div>
            <h3 className="font-bold text-xl">
              Resumen rápido
            </h3>
  
            <p className="text-gray-500 text-sm">
              Tienes 8 pedidos pendientes y
              12 productos con bajo stock.
            </p>
          </div>
  
        </div>
  
        <ChevronRight className="text-green-600" />
      </section>
    );
  }