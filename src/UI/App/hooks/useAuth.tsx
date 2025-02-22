import { useContext } from "react"
import { AuthContext } from "../context/context/AuthContext"

export const useAuth = () => {
    return useContext(AuthContext)
}