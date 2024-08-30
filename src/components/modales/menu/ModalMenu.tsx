import React, { useEffect, useState } from "react";
import EmailPasswordForm from "./forms/emailPassword";
import SignUpForm from "./forms/signUp";
type FormType = "email" | "sign up";

interface ModalMenu {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
export default function ModalMenu({ isModalOpen, setIsModalOpen }: Readonly<ModalMenu>) {
  const [form, setForm] = useState<FormType>("email");

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen) return null;

  const renderForm = (newForm: FormType) => {
    setForm(newForm);
  };

  function renderModalHeader(title: string) {
    return (
      <div className="p-2 pb-0">
        <div className="flex flex-row justify-end p-2">
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
        <div className="pb-2 pt-0 text-center">
          {/* Corregir el uso de children como prop */}
          <h3 className="text-xl font-normal text-black">{title}</h3>
        </div>
      </div>
    )
  }

  function renderModalOptions() {
    return (
      <div className="row-start-1">
        {renderModalHeader("Inicia Sesion")}
        <div className="grid grid-cols-1 px-4">
          {/* Corregir el uso de children como prop */}
          <button
            className="p-2 text-center text-black border border-black rounded-lg col-start-1"
            onClick={() => renderForm("email")}
          >
            Email
          </button>
        </div>
      </div>
    );
  }

  const FORM_COMPONENTS: Record<FormType, React.ElementType> = {
    email: EmailPasswordForm,
    "sign up": SignUpForm,
  };

  function ModalContent({ formOption }: { formOption: FormType }) {
    const FormComponent = FORM_COMPONENTS[formOption];
    return FormComponent ? <FormComponent /> : null;
  }

  function renderModalForms(formOption: FormType) {
    return <ModalContent formOption={formOption} />;
  }

  function renderSignUpOption() {
    return (
      <div className="flex flex-row gap-1 mx-auto my-2 row-start-3">
        <p className="text-black my-auto">No Tienes Una Cuenta?</p>
        {/* Corregir el uso de children como prop */}
        <button
          className="p-2 text-center text-blue-500"
          onClick={() => renderForm("sign up")}
        >
          Crea Una
        </button>
      </div>
    );
  }

  function renderSignInOption() {
    return (
      <div className="flex flex-row gap-1 mx-auto my-2 row-start-3">
        <p className="text-black my-auto">Ya Tienes Una Cuenta?</p>
        {/* Corregir el uso de children como prop */}
        <button
          className="p-2 text-center text-blue-500"
          onClick={() => renderForm("email")}
        >
          Inicia Sesion
        </button>
      </div>
    );
  }

  return (
    <div // fondo del modal
      id="modelConfirm"
      className="fixed z-50 inset-0 bg-gray-900/80 grid grid-cols-[1fr_40%_1fr] grid-rows-[1fr_90%_1fr]"
    >
      {form === "email" ? (
        <div className="col-start-2 row-start-2 mx-auto w-full shadow-xl rounded-lg bg-white px-3 max-w-3xl grid grid-rows-[25%_1fr_10%]">
          {renderModalOptions()}
          {renderModalForms(form)}
          {renderSignUpOption()}
        </div>
      ) : (
        <div className="col-start-2 row-start-2 mx-auto w-full shadow-xl rounded-lg bg-white px-3 max-w-3xl grid grid-rows-[20%_1fr_10%]">
          {renderModalHeader("Registate")}
          {renderModalForms(form)}
          {renderSignInOption()}
        </div>
      )}
    </div>
  )
}