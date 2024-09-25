import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth.config";

export async function SessionProvider({ children }) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return <div>No estás autenticado</div>;
  }

  return <>{children}</>;
}