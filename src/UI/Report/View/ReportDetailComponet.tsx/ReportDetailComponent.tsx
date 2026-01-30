import { es } from "date-fns/locale"
import { format } from "date-fns"
import { AttendanceSection } from './components/AttendanceSection'
import { EvangelismSection } from './components/EvangelismSection'
import { OfferingSection } from './components/OfferingSection'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ReportService } from "../../../../Core/Adapters/ReportService"
import { Report } from "../../../../Core/Report/domain/model/Report"

interface Props {
    data?: Report,
    isProjection?: boolean
}

export const ReportDetailComponent = ({ data }: Props) => {
    const reportService = ReportService;
    const { id } = useParams()

    const [reportDetail, setReportDetail] = useState<Report>({
        id: "",
        familyGroup: null,
        meetingDate: new Date(),
        activeMembers: null,
        activeMembersChildren: null,
        noActiveMembers: null,
        noActiveMembersChildren: null,
        visitorChildren: null,
        visitors: null,
        totalAttendance: null,
        visitedHomes: null,
        newChristians: null,
        reconciled: null,
        vigilAttendance: null,
        offering: null,
        comments: "",
        createdBy: ""

    })

    useEffect(() => {
        if (id) {
            getReportDetail(id)
        } else if (data) {
            setReportDetail(data)
        }
    }, [data])

    const getReportDetail = async (id: string) => {
        const response = await reportService.getOneById.execute(id);
        if (!response) {
            return;
        }
        setReportDetail(response)
    }

    return (
        <div className="flex flex-col w-full h-full gap-2 p-5 box-border br-d ">
            <div className="flex  flex-col w-full">
                <h1 className="text-4xl font-bold max-md:text-2xl max-md:mt-5">{reportDetail?.familyGroup?.name}</h1>
                <h2>Guatemala, {reportDetail?.meetingDate && format(reportDetail?.meetingDate, "EEEE d 'de' MMMM yyyy", { locale: es })}</h2>
            </div>
            <div className="flex flex-col w-full box-border  justify-evenly ">
                <AttendanceSection data={reportDetail} />
                <EvangelismSection data={reportDetail} />
                <OfferingSection data={reportDetail} />
            </div>
        </div>
    )
}
