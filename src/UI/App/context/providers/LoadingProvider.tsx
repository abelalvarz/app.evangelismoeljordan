import { ProgressSpinner } from 'primereact/progressspinner'
import React, { useState } from 'react'
import { LoadingContext } from '../context/LoadingContext'

interface ProviderProps {
    children: React.ReactNode
}
export const LoadingProvider = ({ children }: ProviderProps) => {

    const [loading, setLoading] = useState(false)

    const start = () => {
        setLoading(true)
    }
    const stop = () => {
        setLoading(false)
    }
    return (
        <LoadingContext.Provider value={{ start, stop }}>
            <div className={`w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.3)] z-10 fixed flex justify-center items-center ${loading ? 'visible' : 'hidden'}`}>
                <ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="8" animationDuration=".5s" />
            </div>
            {children}
        </LoadingContext.Provider>
    )
}
