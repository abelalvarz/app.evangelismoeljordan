import { ReportRepository } from "../../domain/repository/ReportRepository";
import { Report } from "../../domain/model/Report";

export class GetOneByIdUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(id: string): Promise<Report | null> {
        const report = await this.repository.getOneById(id);
        return report;
    }
}