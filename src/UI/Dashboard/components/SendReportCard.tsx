
interface SendReportCardProps {
    isReportPending: boolean;
}

export const SendReportCard = ({ isReportPending }: SendReportCardProps) => {
    return (
        <div className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full"></div>

            <div className="relative flex flex-col items-center space-y-4">
                <div className="relative">
                    <div className={`absolute inset-0 ${isReportPending ? 'bg-amber-400' : 'bg-emerald-400'} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                    <div className={`relative w-20 h-20 rounded-full ${isReportPending ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-emerald-400 to-green-500'} flex items-center justify-center shadow-lg`}>
                        {isReportPending ? (
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-slate-800">
                        {isReportPending ? 'Reporte pendiente' : 'Todo al día'}
                    </h3>
                    <p className="text-slate-500 text-sm">
                        {isReportPending
                            ? 'Tienes un reporte de evangelismo sin enviar'
                            : 'No hay reportes pendientes por enviar'}
                    </p>
                </div>

                {isReportPending && (
                    <button className="group/btn relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 active:scale-95">
                        <span className="text-white font-semibold">Enviar reporte</span>
                    </button>
                )}
            </div>
        </div>
    )
}
