export default function SignUpForm() {
    return (
      <form action="/api/auth/signin.ts" method="POST" className="flex flex-col items-center">
        <span className="mb-3">
          <label htmlFor="e-mail">Email</label>
          <input
            type="email"
            name="e-mail"
            placeholder="tu@correo.com"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          />
        </span>
        <span className="mb-3">
          <label htmlFor="pass">Contraseña</label>
          <input
            type="password"
            name="pass"
            placeholder="***************"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          />
        </span>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
          Enviar
        </button>
      </form>
    )
  }