import { useContext } from "react"
import { LoadingContext, LoadingContextProps } from "../context/context/LoadingContext"

export const useLoading = (): LoadingContextProps | undefined => {
    return useContext(LoadingContext)
}