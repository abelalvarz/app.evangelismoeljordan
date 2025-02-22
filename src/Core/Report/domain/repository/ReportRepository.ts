import { Report } from "../model/Report";

export interface ReportRepository {
    create(report: Report): Promise<boolean>
    getAllByFamilyGroup(id: string): Promise<Report[]>
    getAllBetweenDatesAndGroupId(start: Date,endDate:Date, familyGroupId: string): Promise<Report[]>
}