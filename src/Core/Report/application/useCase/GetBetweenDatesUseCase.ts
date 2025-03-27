import { Response } from "../../../Config/Response";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetBetweenDateUseCase{
    constructor(private readonly repository: ReportRepository){}

    async execute(date:Date, familyGroupId: string):Promise<Response<boolean>>{
        const nextFriday = getStartDate(date);
        const lastFridya = getEndDate(date);
        const existingReports = await this.repository.getAllBetweenDatesAndGroupId(
            nextFriday,
            lastFridya,
            familyGroupId
        )
        if(existingReports.length < 1)
            return new Response(false,"Reporte no encontrado entre las fechas ingresada",false)

        return new Response(true,"Reporte encontrado exitosamente",true)
    }
}
const getStartDate = (date: Date) => {
    const pendingDays = 4 - date.getDay();
    const lastDay = new Date(date)
    const daysDiff = pendingDays === 0 ? 0 :pendingDays - 7
    lastDay.setDate(date.getDate() + daysDiff)    
    lastDay.setHours(0,0,0,0)

    return lastDay;
}

const getEndDate = (date: Date) => {
    let pendingDays = 2 - date.getDay();
    let endDateTime = new Date(date)
    const timeDiff = pendingDays < 0 ? pendingDays + 7 : pendingDays
    endDateTime.setDate(date.getDate() + timeDiff)
    endDateTime.setHours(23,59,59,59)

    return endDateTime;
}