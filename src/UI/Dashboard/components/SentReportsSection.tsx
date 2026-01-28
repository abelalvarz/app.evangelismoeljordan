import { useNavigate } from 'react-router-dom';
import { Report } from '../../../Core/Report/domain/model/Report'

export const SentReportsSection = ({ sentReports }: { sentReports: Report[] }) => {
    const navigate = useNavigate();

    const handleViewReport = (id: string | null | undefined) => {
        if (id) {
            navigate(`/reporte/${id}`);
        }
    }
    if (sentReports.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                    Historial de reportes
                </h2>
                <div className="px-3 py-1 bg-slate-200 rounded-full">
                    <span className="text-xs font-bold text-slate-600">{sentReports.length}</span>
                </div>
            </div>

            <div className="space-y-3">
                {sentReports.map((report, index) => (
                    <button
                        key={report.id}
                        onClick={() => handleViewReport(report.id)}
                        className="group w-full bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-2xl p-5 shadow-md hover:shadow-xl border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            animation: `slideIn 0.4s ease-out ${index * 0.1}s both`
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex-1 text-left space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                        {new Date(report.meetingDate).toLocaleDateString()}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="font-bold text-slate-700">{report.totalAttendance}</span>
                                        <span className="text-slate-500">asistentes</span>
                                    </div>
                                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                        <span className="font-bold text-slate-700">{report.visitedHomes}</span>
                                        <span className="text-slate-500">visitados</span>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow */}
                            <svg
                                className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
