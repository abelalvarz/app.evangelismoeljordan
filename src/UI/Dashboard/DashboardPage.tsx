import { ReportService } from "../../Core/Adapters/ReportService"
import { useEffect, useState } from "react";
import { useAuth } from "../App/hooks";
import { Report } from "../../Core/Report/domain/model/Report";
import { CiLogin } from "react-icons/ci";
import { SentReportsSection } from "./components/SentReportsSection";
import { SendReportCard } from "./components/SendReportCard";

export const DashboardPage = () => {
    const service = ReportService;
    const loggedUser = useAuth();
    const [isReportPending, setIsReportPending] = useState(true);
    const [sentReports, setSentReports] = useState<Report[]>([])

    useEffect(() => {
        const fetchCurrentReport = async () => {
            const response = await service.validateIsCurrentReportSent.execute()
            if (response.success)
                setIsReportPending(!response.data)

            const sentReportsResponse = await service.getAll.execute()
            if (sentReportsResponse.success) {
                setSentReports(sentReportsResponse.data)
            }
        }
        fetchCurrentReport()
    }, [])

    return (
        <div className='w-full h-[100vh] flex flex-col '>
            <div className="p-5 flex items-center justify-between ">
                <div>
                    <h1 className='text-2xl font-bold text-gray-500'>Evangelismo</h1>
                    <h2 className="text-gray-500 text-sm">El Jordan</h2>
                </div>
                <div>
                    <button
                        onClick={() => {
                            loggedUser?.logout()
                        }}
                        className="flex items-center gap-2 transition-colors">
                        <span className="text-gray-500">Salir</span>

                        <CiLogin size={20} color="gray" />
                    </button>
                </div>
            </div>
            <div className="flex-1 px-6 py-6 space-y-8 overflow-y-auto pb-32">
                <SendReportCard isReportPending={isReportPending} />
                <SentReportsSection sentReports={sentReports} />
            </div>
        </div>
    )
}
