import { createContext } from "react";

export interface LoadingContextProps {
    start: VoidFunction,
    stop: VoidFunction
}
export const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)