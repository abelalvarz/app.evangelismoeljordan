import { Response } from "../../../Config/Response"
import { Report } from "../../domain/model/Report"
import { ReportRepository } from "../../domain/repository/ReportRepository"

export class GetAllUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(familyGroupId: string): Promise<Response<Report[]>> {

        const data = await this.repository.getAllByFamilyGroup(familyGroupId)

        return new Response(true, "Success Operation", data)
    }
}