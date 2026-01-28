import { Report } from "../../../../../Core/Report/domain/model/Report"

interface Prosp {
    data: Report
}
export const AttendanceSection = ({ data }: Prosp) => {
    return (
        <div className="w-full box-border  mt-3">
            <h1 className="text-lg  font-bold bg-green-300 rounded-sm pl-2">Asistencia</h1>
            <div className="w-full  rounded-md">
                <div className="report-detail-line">
                    <label>Miembros activos</label>
                    <label>{data.activeMembers}</label>
                </div>
                <div className="report-detail-line">
                    <label>Hijos de miembros activos</label>
                    <label>{data.activeMembersChildren}</label>
                </div>
                <div className="report-detail-line">
                    <label>Miembros no activos</label>
                    <label>{data.noActiveMembers}</label>
                </div>
                <div className="report-detail-line">
                    <label>Hijos de miembros no activos</label>
                    <label>{data.noActiveMembersChildren}</label>
                </div>
                <div className="report-detail-line">
                    <label>Niños visitantes</label>
                    <label>{data.visitorChildren}</label>
                </div>
                <div className="report-detail-line">
                    <label>Amigos visitantes</label>
                    <label>{data.visitors}</label>
                </div>
                <div className="w-full flex justify-between mt-[1px] border-t-gray-200 border-t-[1px] py-2 px-2">
                    <label className="font-bold">Total asistentes</label>
                    <label className="font-bold">{data.totalAttendance}</label>
                </div>
            </div>
        </div>
    )
}
