import { useEffect } from "react";
import useCart from "@/hooks/useCart"; // Importa tu hook personalizado
import type { ModalCarritoProps } from "../interface";

export default function ModalCarrito({
  isModalOpen,
  setIsModalOpen,
}: Readonly<ModalCarritoProps>) {
  const { cart, removeFromCart } = useCart(); // Utiliza el carrito desde el hook

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen) return null;

  function renderHeader() {
    return (
      <div className="flex justify-between p-2">
        <button className="mr-auto inline-flex items-center rounded-lg bg-transparent p-1.5">
          <picture>
            <img src="/carrito.svg" alt="Carrito" className="h-5 w-5" />
          </picture>
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          type="button"
          className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    );
  }

  function displayCartItems(): JSX.Element {
    return (
      <div className="pb-3 pt-0 grid grid-rows-[10%_8%_92%] h-full">
        <h3 className="text-xl font-normal text-gray-500 text-center row-start-1 my-auto">
          Este es tu carrito de compras
        </h3>
        <div className="row-start-2 grid grid-cols-[10%_1fr_15%_15%] gap-x-1 rounded px-3">
          <span className="text-lg text-start col-start-1">{"ID"}</span>
          <span className="text-lg text-start col-start-2">{"Producto"}</span>
          <span className="text-lg text-center col-start-3">{"Cantidad"}</span>
          <span className="text-lg text-center col-start-4">Precio</span>
        </div>
        <div className="row-start-3 flex flex-col gap-1 mt-2 overflow-y-scroll">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={item.productId}
                className={`grid grid-cols-[10%_1fr_15%_15%] gap-x-1 rounded px-3 py-1.5 ${index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
                  }`}
              >
                <span className="text-lg col-start-1 text-start">{item.productId}</span>
                <span className="text-lg col-start-2 text-start">{item.nombre}</span>
                <span className="text-lg col-start-3 text-center">{item.quantity}</span>
                <span className="text-lg col-start-4 text-center">{"$" + item.price}</span>
                <button
                  className="text-red-500 col-span-4 mt-2"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <div className="text-lg my-3 bg-blue-100 p-3 text-center">
              No hay elementos en el carrito.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "fixed z-50 inset-0 bg-gray-900/60 " +
        "grid grid-cols-[1fr_70%_1fr] grid-rows-[1fr_80%_1fr]"
      }>
      <div
        className={
          "col-start-2 row-start-2 mx-auto w-full shadow-xl rounded-lg bg-white max-w-4xl " +
          "grid grid-rows-[85%_1fr]"
        }>
        <div className="p-3 pb-0 row-start-1 max-h-[85%]">
          {renderHeader()}
          {displayCartItems()}
        </div>
        <div className="row-start-2 flex flex-row justify-end bg-white">
          <button
            className="my-auto py-2 px-4 mx-5 text-lg border rounded bg-green-500 text-white uppercase"
            onClick={() => setIsModalOpen(false)}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
