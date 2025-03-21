import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Severity, ToastContext } from "../context/ToastContext";

interface ToastProps {
    children: React.ReactNode
}

export const ToastProvider = ({ children }: ToastProps) => {

    const toastRef = useRef<Toast>(null)
    const show = (type: Severity, title: string, message: string) => {
        toastRef.current?.show({ severity: type, summary: title, detail: message, life: 3000 })
    }

    return (
        <ToastContext value={{ show }}>
            <Toast className="text-center flex items-center justify-center" ref={toastRef} position="top-center" />
            {children}
        </ToastContext>
    )
}
