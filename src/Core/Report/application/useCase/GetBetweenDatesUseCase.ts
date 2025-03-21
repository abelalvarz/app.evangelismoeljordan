import { Response } from "../../../Config/Response";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetBetweenDateUseCase{
    constructor(private readonly repository: ReportRepository){}

    async execute(date:Date, familyGroupId: string):Promise<Response<boolean>>{
        const nextFriday = getLastFriday(date);
        const lastFridya = getNextFriday(date);
        console.log(nextFriday)
        console.log(lastFridya)
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
const getLastFriday = (date: Date) => {
    const faltan = 5 - date.getDay();
    const lastSaturday = new Date(date)
    lastSaturday.setDate(date.getDate() + faltan - 7)
    
    return lastSaturday;
}

const getNextFriday = (date: Date) => {
    let faltan = 5 - date.getDay();
    let nextSaturday = new Date(date)
    nextSaturday.setDate(date.getDate() + faltan)
    console.log(nextSaturday)

    return nextSaturday;
}