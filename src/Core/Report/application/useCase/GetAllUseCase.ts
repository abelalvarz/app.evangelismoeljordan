import { getFinalDate, getStartDate } from "../../../../utils/util.IntervalTimeGenerator"
import { Response } from "../../../Config/Response"
import { Report } from "../../domain/model/Report"
import { ReportRepository } from "../../domain/repository/ReportRepository"

export class GetAllUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(): Promise<Response<Report[]>> {
        const startDate = getStartDate(4)
        const endDate = getFinalDate(0) 
        const data = await this.repository.getAllByFamilyGroupUser(startDate, endDate)

        return new Response(true, "Success Operation", data)
    }
}