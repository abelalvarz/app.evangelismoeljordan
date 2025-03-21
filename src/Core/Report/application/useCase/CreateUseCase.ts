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

        const existingReports = await this.repository.getAllBetweenDatesAndGroupId(
            getLastFriday(request.meetingDate),
            getNextFriday(request.meetingDate), 
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