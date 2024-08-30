export default function EmailPasswordForm() {
    return (
      <form action="../../../api/auth/signin" method="POST" className="flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 my-auto">
          <h1 className="text-xl font-semibold">Inicia Sesion</h1>
          <div className="flex flex-col gap-y-2 my-2">
            <span>
              <label className="my-2" htmlFor="mail">
                Ingresa Tu Correo Electronico
              </label>
              <input type="email" name="mail" placeholder="tu@correo.com" className="w-full px-4 border rounded-lg text-gray-700 focus:border-blue-500" />
            </span>
            <span>
              <label className="my-2" htmlFor="pass">
                Ingresa Tu Contraseña
              </label>
              <input type="password" name="pass" placeholder="***************" className="w-full px-4 border rounded-lg text-gray-700 focus:border-blue-500" />
            </span>
          </div>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
            Enviar
          </button>
        </div>
      </form>
    )
  }