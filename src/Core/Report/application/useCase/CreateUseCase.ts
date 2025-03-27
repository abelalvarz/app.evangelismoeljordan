import { Response } from "../../../Config/Response";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { CreateReportRequest } from "../dtos/CreateReportRequest";

export class CreateUseCase {

    constructor(private readonly repository: ReportRepository) { }

    async execute(request: CreateReportRequest): Promise<Response<null>> {

        if (request.meetingDate > new Date())
            return new Response(false, "La fecha del reporte no puede ser mayor a la actual", null)

        if (!request.familyGroup?.id)
            return new Response(false, "No se pudo enviar el reporte", null)

        const startDate = getStartDate(request.meetingDate)
        const endDate = getEndDate(request.meetingDate)
        
        const currentDay = new Date()
        currentDay.setHours(23,59,59,59)

        if(currentDay > endDate || request.meetingDate.getDay()===3)
            return new Response(false, "El tiempo para enviar el reporte ya vencio, comunicate con evangelismo", null)

        const existingReports = await this.repository.getAllBetweenDatesAndGroupId(
            startDate,
            endDate, 
            request?.familyGroup?.id
        )

        if (existingReports.length > 0)
            return new Response(false, "Ya existe un reporte para la semana de la fecha seleccionada", null)

        const response = await this.repository.create(request)
        if (!response)
            return new Response(false, "No se pudo crear el report", null)

        return new Response(true, "Success Operation", null)
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