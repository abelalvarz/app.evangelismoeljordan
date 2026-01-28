import { Report } from "../../../../../Core/Report/domain/model/Report"


interface Prosp {
    data: Report
}

export const EvangelismSection = ({ data }: Prosp) => {
    return (
        <div className="w-full box-border  mt-3 ">
            <h1 className="text-xl font-bold bg-blue-300 rounded-sm pl-2">Evangelizacion</h1>
            <div className="w-full bg-slate-50 rounded-md">
                <div className="report-detail-line">
                    <label>Hogares visitados</label>
                    <label>{data.visitedHomes}</label>
                </div>
                <div className="report-detail-line">
                    <label>Aceptados</label>
                    <label>{data.newChristians}</label>
                </div>
                <div className="report-detail-line">
                    <label>Reconciliados</label>
                    <label>{data.reconciled}</label>
                </div>
                <div className="report-detail-line">
                    <label>Asistencia a la vigilia</label>
                    <label>{data.vigilAttendance}</label>
                </div>
            </div>
        </div>
    )
}
