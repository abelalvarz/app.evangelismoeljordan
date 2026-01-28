import { Report } from "../model/Report";

export interface ReportRepository {
    create(report: Report): Promise<boolean>
    getAllByFamilyGroupUser(): Promise<Report[]>
    getWeeklyReportIfExists(start: Date,endDate:Date): Promise<Report[]>
    getOneById(id: string): Promise<Report | null>
}