import { useContext } from "react"
import { ToastContext, ToastContextProps } from "../context/context/ToastContext"

export const useToast = (): ToastContextProps | undefined => {
    return useContext(ToastContext)
}