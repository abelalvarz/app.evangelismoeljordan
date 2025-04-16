import { getFinalDate, getStartDate } from "../../../../utils/util.IntervalTimeGenerator";
import { Response } from "../../../Config/Response";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetBetweenDateUseCase{
    constructor(private readonly repository: ReportRepository){}

    async execute(familyGroupId: string):Promise<Response<boolean>>{
        const nextFriday = getStartDate(0);
        const lastFridya = getFinalDate(0);
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
