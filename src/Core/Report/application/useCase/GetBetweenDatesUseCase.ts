import { Response } from "../../../Config/Response";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetBetweenDateUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(): Promise<Response<boolean>> {
        const existingReports = await this.repository.getAllByFamilyGroupUser()
        if (existingReports.length < 1)
            return new Response(false, "Reporte no encontrado entre las fechas ingresada", false)

        return new Response(true, "Reporte encontrado exitosamente", true)
    }
}
