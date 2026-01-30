import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks';

export const Navigation = () => {

    const location = window.location.pathname;
    const navigate = useNavigate();

    const auth = useAuth()

    if (!auth?.loggedUser.isLogged) {
        return <></>
    }

    return (
        <>
            <div className='w-full h-20 bg-transparent absolute bottom-0 rounded-t-md'>
                {location === '/dashboard' && (
                    <div className="fixed bottom-6 left-6 right-6 flex justify-center">
                        <button
                            onClick={() => navigate("/nuevo")}
                            className="group relative w-full max-w-md bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-700 hover:via-blue-700 hover:to-indigo-700 rounded-2xl px-8 py-4 shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </div>

                            <div className="relative flex items-center justify-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="text-white text-lg font-bold tracking-wide">Nuevo Reporte</span>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
