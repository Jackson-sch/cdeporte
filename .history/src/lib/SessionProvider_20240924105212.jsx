import { auth } from "@/auth"

export async function SessionProvider({ children }) {
  const session = await auth()

  if (!session) {
    return <div>No estás autenticado</div>
  }

  return <>{children}</>
}