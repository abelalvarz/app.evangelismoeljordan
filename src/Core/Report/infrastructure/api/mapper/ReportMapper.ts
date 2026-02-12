import { Report } from "../../../domain/model/Report";
import { FamilyGroup } from "../../../domain/types/FamilyGroup";

export class ReportDataMapper {

    static toApiRequest(report: Report): unknown {
        return {
            meetingDate: report.meetingDate,
            hostName: report.familyGroup?.anfitrion || null,
            attendance: {
                activeMembers: report.activeMembers || 0,
                activeChildren: report.activeMembersChildren || 0,
                inactiveMembers: report.noActiveMembers || 0,
                inactiveChildren: report.noActiveMembersChildren || 0,
                visitorChildren: report.visitorChildren || 0,
                visitorAdults: report.visitors || 0
            },
            evangelism: {
                vigilAttendance: report.vigilAttendance || 0,
                visitedHomes: report.visitedHomes || 0,
                newChristians: report.newChristians || 0,
                reconciled: report.reconciled || 0
            },
            finance: {
                offeringAmount: report.offering || 0,
                observations: report.comments || '',
            },
            cellId: report.familyGroup ? report.familyGroup.id : null,
        }
    }

    static fromApiResponse(data: any): Report {

        const attendance = data.attendance || {};
        const evangelism = data.evangelism || {};
        const finance = data.finance || {};
        return new Report(
            data.id,
            this.mapFamilyGroup(data.cell),
            data.meetingDate,
            attendance.activeMembers,
            attendance.activeChildren,
            attendance.inactiveMembers,
            attendance.inactiveChildren,
            attendance.visitorChildren,
            attendance.visitorAdults,
            attendance.totalAttendance,
            evangelism.newChristians,
            evangelism.reconciled,
            evangelism.vigilAttendance,
            evangelism.visitedHomes,
            finance.offeringAmount,
            finance.observations,
            data.createdBy,
            data.creationDate,
            data.createdFrom,
        );
    }


    static fromApiListResponse(dataList: any[]): Report[] {
        console.log('responseList: ',dataList)
        return dataList.map(data => this.fromApiResponse(data));
    }
    private static mapFamilyGroup(data: unknown): FamilyGroup {
        return {
            id: (data as any).id || null,
            name: (data as any).name || '',
            color: (data as any).color || '',
            teacher: (data as any).teacherName || '',
            anfitrion: (data as any).anfitrion || '',
            leaders: (data as any).leaders || [],
            meetingDay: (data as any).meetingDay || '',
            meetingTime: (data as any).meetingTime || ''
        }
    }
}