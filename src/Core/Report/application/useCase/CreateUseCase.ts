import { Response } from "../../../Config/Response";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { CreateReportRequest } from "../dtos/CreateReportRequest";

export class CreateUseCase {

    constructor(private readonly repository: ReportRepository) { }

    async execute(request: CreateReportRequest): Promise<Response<null>> {

        if (request.meetingDate > new Date())
            return new Response(false, "La fecha del reporte no puede ser mayor a la actual", null)

        if (!request.familyGroup?.id)
            return new Response(false, "No se pudo emviar el reporte", null)

        const existingReports = await this.repository.getAllBetweenDatesAndGroupId(getLastFriday(request.meetingDate), getNextFriday(request.meetingDate), request?.familyGroup?.id)
        console.log("existing reports", existingReports)

        if (existingReports.length > 0)
            return new Response(false, "Ya existe un reporte para la fecha seleccionada", null)

        const response = await this.repository.create(request)
        if (!response)
            return new Response(false, "No se pudo crear el report", null)

        return new Response(true, "Success Operation", null)
    }
}

const getLastFriday = (date: Date) => {
    const day = date.getDay();
    const timeDifference = day == 5 ? -7 : 5 - day;

    const lastFriday = new Date(date);
    lastFriday.setDate(lastFriday.getDate() + timeDifference);
    console.log("LastFriday", lastFriday)
    return lastFriday;
}

const getNextFriday = (date: Date) => {
    const day = date.getDay();
    const timeDifference = day == 5 ? -7 : 5 - day;

    const lastFriday = new Date(date);
    lastFriday.setDate(lastFriday.getDate() - timeDifference);
    console.log("NextFid", lastFriday)
    return lastFriday;
}