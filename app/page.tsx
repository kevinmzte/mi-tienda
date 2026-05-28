import Header from "@/components/Header";
import DashboardCard from "@/components/DashboardCard";
import QuickInfo from "@/components/QuickInfo";
import Link from "next/link";

import {
  ShoppingCart,
  Package,
  MessageCircle,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] p-4">
      <div className="max-w-md mx-auto">

        <Header />

        <section className="grid grid-cols-2 gap-4">   
          <Link href="/pedidos">
          <DashboardCard
            icon={
              <ShoppingCart
                size={46}
                className="text-purple-600"
              />
            }
            title="Pedidos"
            description="Gestiona y revisa pedidos"
            bg="bg-[#f3eefc]"
            iconBg="bg-[#e5d8ff]"
            buttonBg="bg-purple-600"
          />
          </Link>       
          <Link href="/productos/nuevo">
          <DashboardCard
            icon={
              <Package
                size={46}
                className="text-green-600"
              />
            }
            title="Productos"
            description="Agregar o ver inventario"
            bg="bg-[#eef8f1]"
            iconBg="bg-[#d9f6df]"
            buttonBg="bg-green-600"
          />
          </Link>
          <DashboardCard
            icon={
              <MessageCircle
                size={46}
                className="text-blue-600"
              />
            }
            title="WhatsApp"
            description="Habla con clientes"
            bg="bg-[#eef4ff]"
            iconBg="bg-[#dce8ff]"
            buttonBg="bg-blue-600"
          />
          <Link href="/catalogo/mi-tienda">
          <DashboardCard
            icon={
              <BookOpen
                size={46}
                className="text-orange-500"
              />
            }
            title="Catálogo"
            description="Comparte productos"
            bg="bg-[#fff7e9]"
            iconBg="bg-[#ffefc8]"
            buttonBg="bg-orange-500"
          />
        </Link>
        </section>

        <QuickInfo />

      </div>
    </main>
  );
}