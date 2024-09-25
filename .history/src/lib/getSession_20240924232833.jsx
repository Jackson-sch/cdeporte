import { auth } from "@/auth"
import {cache} from "react"

export const getSession = cache(async () => {
  const session = await auth.getSession()
  return session
})