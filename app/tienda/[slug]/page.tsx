"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  ShoppingBag,
  MessageCircle,
  Minus,
  Plus, 
  Trash2,
} from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  image?: string;
};

type CartItem = {
  id: number;
  nombre: string;
  precio: number;
  image?: string;
  cantidad: number;
};

export default function TiendaPage({
  params,
}: Props) {

  const { slug } = use(params);

  const [productos, setProductos] =
    useState<Producto[]>([]);

  const [showCartMessage, setShowCartMessage] =
    useState(false);
  
  const [cartMessage, setCartMessage] =
    useState("");

  const [showCart, setShowCart] =
    useState(false);

  const [showSuccessModal, setShowSuccessModal] =
    useState(false);
  
  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [showEmptyCartModal, setShowEmptyCartModal] =
    useState(false);
    
  const [cantidades, setCantidades] =
    useState<{ [key: number]: number }>({});
  const agregarAlCarrito = (
        producto: Producto
      ) => {
      
        const cantidad =
          cantidades[producto.id] || 1;
      
        // obtener carrito actual
        const cart = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
      
        // verificar si ya existe
        const existingProduct =
          cart.find(
            (item: any) =>
              item.id === producto.id
          );
      
        if (existingProduct) {
      
          existingProduct.cantidad +=
            cantidad;
      
        } else {
      
          cart.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            image: producto.image,
            cantidad,
          });
      
        }
      
        // guardar carrito
        localStorage.setItem(
          "cart",
          JSON.stringify(cart)
        );

        setCart(cart);
      
        setCartMessage("Producto agregado al carrito 🛒");

        setShowCartMessage(true);

        setTimeout(() => {

        setShowCartMessage(false);

      }, 2500);
      
      };
      const aumentarCarrito = (
        id: number
      ) => {
      
        const updatedCart = cart.map(
          (item) => {
      
            if (item.id === id) {
      
              return {
                ...item,
                cantidad:
                  item.cantidad + 1,
              };
      
            }
      
            return item;
      
          }
        );
      
        setCart(updatedCart);
      
        localStorage.setItem(
          "cart",
          JSON.stringify(updatedCart)
        );
      
      };
      const disminuirCarrito = (
        id: number
      ) => {
      
        const updatedCart = cart
          .map((item) => {
      
            if (item.id === id) {
      
              return {
                ...item,
                cantidad:
                  item.cantidad - 1,
              };
      
            }
      
            return item;
      
          })
          .filter(
            (item) => item.cantidad > 0
          );
      
        setCart(updatedCart);
      
        localStorage.setItem(
          "cart",
          JSON.stringify(updatedCart)
        );
      
      };
      const eliminarDelCarrito = (
        id: number
      ) => {
      
        const updatedCart =
          cart.filter(
            (item) => item.id !== id
          );
      
        setCart(updatedCart);
      
        localStorage.setItem(
          "cart",
          JSON.stringify(updatedCart)
        );
      
      };

  // MODAL
  const [showModal, setShowModal] =
    useState(false);

  const [cliente, setCliente] =
    useState("");

  const [telefono, setTelefono] =
    useState("");
  

  useEffect(() => {

    const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      
      setCart(savedCart);

    const savedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    setProductos(savedProducts);

  }, []);

  const aumentarCantidad = (
    id: number,
    stock: number
  ) => {

    setCantidades((prev) => {

      const actual = prev[id] || 1;

      if (actual >= stock) return prev;

      return {
        ...prev,
        [id]: actual + 1,
      };

    });

  };

  const disminuirCantidad = (
    id: number
  ) => {

    setCantidades((prev) => {

      const actual = prev[id] || 1;

      if (actual <= 1) return prev;

      return {
        ...prev,
        [id]: actual - 1,
      };

    });

  };

  const handleBuy = () => {

    if (!cliente || !telefono) {
  
      alert("Completa los datos");
      return;
  
    }
  
    // obtener carrito
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
  
    if (cart.length === 0) {
  
      alert("El carrito está vacío");
      return;
  
    }
  
    // obtener pedidos
    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
  
    // calcular total
    const total = cart.reduce(
      (acc: number, item: any) =>
        acc + item.precio * item.cantidad,
      0
    );
  
    // crear pedido
    const newOrder = {
  
      id: Date.now(),
  
      cliente,
  
      telefono,
  
      estado: "pendiente",
  
      total,
  
      productos: cart.map((item: any) => ({
  
        id: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
  
      })),
  
    };
  
    // guardar pedido
    orders.push(newOrder);
  
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  
    // actualizar stock
    const updatedProducts =
      productos.map((product) => {
  
        const cartItem = cart.find(
          (item: any) =>
            item.id === product.id
        );
  
        if (cartItem) {
  
          return {
  
            ...product,
  
            stock:
              product.stock -
              cartItem.cantidad,
  
          };
  
        }
  
        return product;
  
      });
  
    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );
  
    setProductos(updatedProducts);
  
    // mensaje whatsapp
    let mensaje =
      `Hola 👋 acabo de realizar este pedido:\n\n`;
  
    cart.forEach((item: any) => {
  
      mensaje +=
        `• ${item.nombre}\n` +
        `${item.cantidad} x ₲ ${item.precio}\n\n`;
  
    });
  
    mensaje += `Total: ₲ ${total}`;
  
    setShowSuccessModal(true);

    setTimeout(() => {

      setShowSuccessModal(false);
    
      window.open(
        `https://wa.me/595981000000?text=${encodeURIComponent(mensaje)}`,
        "_blank"
      );
    
    }, 2000);
    // vaciar carrito
    localStorage.removeItem("cart");
    setCart([]);
  
    // cerrar modal
    setShowModal(false);

    setShowCart(false);
  
    // reset
    setCliente("");
    setTelefono("");
  
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] pb-24">

      {/* HEADER */}
      <section
        className="
          bg-white
          rounded-b-[40px]
          p-6
          shadow-sm
        "
      >

        <div className="max-w-md mx-auto">

          <div className="flex items-center gap-4">

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-orange-100
                flex
                items-center
                justify-center
              "
            >

              <ShoppingBag
                size={38}
                className="text-orange-500"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold capitalize">
                {slug}
              </h1>

              <p className="text-gray-500 mt-1">
                Catálogo oficial
              </p>

            </div>

          </div>

          {/* INFO */}
          <div
            className="
              mt-6
              bg-[#fff7e9]
              rounded-3xl
              p-4
            "
          >

            <p className="text-sm text-gray-700">
              📦 Entregas en el día
            </p>

            <p className="text-sm text-gray-700 mt-1">
              💳 Transferencia / efectivo
            </p>

          </div>

        </div>

      </section>

      {/* PRODUCTOS */}
      <section className="max-w-md mx-auto p-4">

        {productos.length === 0 ? (

          <div
            className="
              bg-white
              rounded-[32px]
              p-10
              shadow-sm
              text-center
              mt-4
            "
          >

            <div className="bg-gray-100 p-6 rounded-full w-fit mx-auto">

              <ShoppingBag
                size={48}
                className="text-orange-500"
              />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              No hay productos
            </h2>

            <p className="text-gray-500 mt-2">
              La tienda aún no publicó productos.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {productos.map((producto) => {

              const cantidad =
                cantidades[producto.id] || 1;

              return (

                <div
                  key={producto.id}
                  className="
                    bg-white
                    rounded-[32px]
                    overflow-hidden
                    shadow-sm
                  "
                >

                  {/* FOTO */}
                  <div className="h-72 bg-gray-100 relative">

                    {producto.image ? (

                      <Image
                        src={producto.image}
                        alt={producto.nombre}
                        fill
                        className="object-cover"
                      />

                    ) : (

                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <ShoppingBag
                          size={50}
                          className="text-orange-400"
                        />

                      </div>

                    )}

                  </div>

                  {/* INFO */}
                  <div className="p-5">

                    <h2 className="text-2xl font-bold">
                      {producto.nombre}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {producto.descripcion}
                    </p>

                    <p
                      className="
                        text-orange-500
                        text-2xl
                        font-bold
                        mt-4
                      "
                    >
                      ₲ {producto.precio}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Stock disponible: {producto.stock}
                    </p>

                    {/* CANTIDAD */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mt-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                          bg-[#f5f5f7]
                          rounded-2xl
                          px-4
                          py-3
                        "
                      >

                        <button
                          onClick={() =>
                            disminuirCantidad(
                              producto.id
                            )
                          }
                        >
                          <Minus size={18} />
                        </button>

                        <span className="font-bold text-lg">
                          {cantidad}
                        </span>

                        <button
                          onClick={() =>
                            aumentarCantidad(
                              producto.id,
                              producto.stock
                            )
                          }
                        >
                          <Plus size={18} />
                        </button>

                      </div>

                    </div>

                    {/* BOTON */}
                    <button
                      onClick={() =>
                        agregarAlCarrito(producto)
                      }
                      className="
                        w-full
                        bg-green-600
                        text-white
                        rounded-2xl
                        p-4
                        mt-5
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        active:scale-95
                        transition-all
                      "
                    >

                      <MessageCircle size={20} />

                      Agregar al carrito

                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </section>
        <button
        onClick={() =>
            setShowCart(true)
        }
        className="
            fixed
            bottom-6
            right-6
            bg-green-600
            text-white
            px-6
            py-4
            rounded-2xl
            shadow-lg
            font-semibold
            flex
            items-center
            gap-3
            z-50
        "
        >

        🛒

        {cart.length}

        </button>

        {showCart && (

<div
  className="
    fixed
    inset-0
    bg-black/40
    z-50
    flex
    items-end
  "
>

  <div
    className="
      bg-white
      w-full
      rounded-t-[32px]
      p-6
      max-h-[80vh]
      overflow-y-auto
    "
  >

    {/* TOP */}
    <div className="flex justify-between items-center">

      <h2 className="text-2xl font-bold">
        Tu carrito
      </h2>

      <button
        onClick={() =>
          setShowCart(false)
        }
        className="text-gray-500"
      >
        ✕
      </button>

    </div>

    {/* PRODUCTOS */}
    <div className="space-y-4 mt-6">

      {cart.map((item) => (

<div
key={item.id}
className="
  bg-[#f5f5f7]
  rounded-2xl
  p-4
"
>

<div className="flex justify-between">

  <div>

    <h3 className="font-bold">
      {item.nombre}
    </h3>

    <p className="text-gray-500 text-sm mt-1">
      ₲ {item.precio}
    </p>

  </div>

  <button
    onClick={() =>
      eliminarDelCarrito(item.id)
    }
    className="text-red-500"
  >
    <Trash2 size={18} />
  </button>

</div>

{/* CONTROLES */}
<div
  className="
    flex
    items-center
    gap-4
    mt-4
  "
>

  <button
    onClick={() =>
      disminuirCarrito(item.id)
    }
    className="
      w-10
      h-10
      rounded-full
      bg-white
      flex
      items-center
      justify-center
    "
  >
    <Minus size={18} />
  </button>

  <span className="font-bold text-lg">
    {item.cantidad}
  </span>

  <button
    onClick={() =>
      aumentarCarrito(item.id)
    }
    className="
      w-10
      h-10
      rounded-full
      bg-white
      flex
      items-center
      justify-center
    "
  >
    <Plus size={18} />
  </button>

</div>

</div>

      ))}

    </div>

    {/* TOTAL */}
    <div className="mt-6">

      <p className="text-2xl font-bold">

        Total: ₲ {

          cart.reduce(
            (acc, item) =>
              acc +
              item.precio *
              item.cantidad,
            0
          )

        }

      </p>

    </div>

    {/* BOTON */}
    <button
  onClick={() => {

    if (cart.length === 0) {

      setShowEmptyCartModal(true);
    
      return;
    
    }

    setShowModal(true);

  }}
  className="
    w-full
    bg-green-600
    text-white
    rounded-2xl
    p-4
    mt-6
    font-semibold
    active:scale-95
    transition-all
  "
>
  Finalizar compra
</button>

  </div>

</div>

)}
      {/* MODAL */}
      {showModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            p-4
            z-50
          "
        >

          <div
            className="
              bg-white
              rounded-[32px]
              p-6
              w-full
              max-w-sm
            "
          >

            <h2 className="text-2xl font-bold">
              Completa tus datos
            </h2>

            <p className="text-gray-500 mt-1">
              Para continuar con tu pedido
            </p>

            <div className="space-y-4 mt-6">

              <input
                type="text"
                placeholder="Tu nombre"
                value={cliente}
                onChange={(e) =>
                  setCliente(e.target.value)
                }
                className="
                  w-full
                  bg-[#f5f5f7]
                  rounded-2xl
                  p-4
                  outline-none
                "
              />

              <input
                type="text"
                placeholder="Tu teléfono"
                value={telefono}
                onChange={(e) =>
                  setTelefono(e.target.value)
                }
                className="
                  w-full
                  bg-[#f5f5f7]
                  rounded-2xl
                  p-4
                  outline-none
                "
              />

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  flex-1
                  bg-gray-200
                  rounded-2xl
                  p-4
                  font-semibold
                "
              >
                Cancelar
              </button>

              <button
                onClick={handleBuy}
                className="
                  flex-1
                  bg-green-600
                  text-white
                  rounded-2xl
                  p-4
                  font-semibold
                "
              >
                Continuar
              </button>

            </div>

          </div>

        </div>

      )}
      {/* TOAST */}
      {showCartMessage && (

      <div
        className="
          fixed
          bottom-24
          left-1/2
          -translate-x-1/2
          bg-black
          text-white
          px-5
          py-4
          rounded-2xl
          shadow-xl
          z-50
          animate-[fadeIn_.2s_ease]
        "
      >

        <p className="font-medium">
          {cartMessage}
        </p>

      </div>

      )}

      {/* SUCCESS MODAL */}
{showSuccessModal && (

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
        w-20
        h-20
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
      Reserva realizada
    </h2>

    <p className="text-gray-500 mt-3">
      Gracias por realizar tu pedido.
    </p>

    <p className="text-gray-500 mt-1">
      Serás redirigido a WhatsApp
      para finalizar los detalles.
    </p>

    <div
      className="
        mt-6
        w-full
        h-2
        bg-gray-200
        rounded-full
        overflow-hidden
      "
    >

      <div
        className="
          h-full
          bg-green-600
          animate-[loading_2s_linear]
        "
      />

    </div>

  </div>

</div>

)}

{/* EMPTY CART MODAL */}
{showEmptyCartModal && (

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
        w-20
        h-20
        rounded-full
        bg-orange-100
        flex
        items-center
        justify-center
        mx-auto
      "
    >
      🛒
    </div>

    <h2 className="text-2xl font-bold mt-5">
      Carrito vacío
    </h2>

    <p className="text-gray-500 mt-3">
      Agrega productos antes de
      finalizar tu pedido.
    </p>

    <button
      onClick={() =>
        setShowEmptyCartModal(false)
      }
      className="
        w-full
        bg-green-600
        text-white
        rounded-2xl
        p-4
        mt-6
        font-semibold
        active:scale-95
        transition-all
      "
    >
      Entendido
    </button>

  </div>

</div>

)}

    </main>
  );
}