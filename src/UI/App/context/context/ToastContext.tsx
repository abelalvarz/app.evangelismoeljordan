import { createContext } from "react";

export type Severity = 'success' | 'warn' | 'info' | 'error'

export interface ToastContextProps {
    show: (type: Severity, title: string, message: string) => void
}
export const ToastContext = createContext<ToastContextProps | undefined>(undefined);