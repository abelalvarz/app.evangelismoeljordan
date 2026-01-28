import { Report } from "../../../../../Core/Report/domain/model/Report"


interface Props {
    data: Report
}

export const OfferingSection = ({ data }: Props) => {
    return (
        <div className="w-full box-border  mt-3 ">
            <h1 className="text-xl font-bold rounded-sm bg-yellow-300 pl-2">Ofrenda</h1>
            <div className="w-full bg-slate-50 rounded-md">
                <div className="report-detail-line">
                    <label>Ofrenda</label>
                    <label>{data.offering}</label>
                </div>
                <div className="w-full flex flex-col justify-between  py-2 px-2">
                    <label>Comentarios</label>
                    <small>{data.comments}</small>
                </div>
            </div>
        </div>
    )
}
