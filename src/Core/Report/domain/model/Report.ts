import { FamilyGroup } from "../types/FamilyGroup";

export class Report {
    constructor(
        readonly id: string | null | undefined,
        readonly familyGroup: FamilyGroup | null,
        readonly meetingDate: Date,
        readonly activeMembers: number | null,
        readonly activeMembersChildren: number | null,
        readonly noActiveMembers: number | null,
        readonly noActiveMembersChildren: number | null,
        readonly visitorChildren: number | null,
        readonly visitors: number | null,
        readonly totalAttendance: number | null,
        readonly newChristians: number | null,
        readonly reconciled: number | null,
        readonly vigilAttendance: number | null,
        readonly visitedHomes: number | null,
        readonly offering: number | null,
        readonly comments: string,
        readonly createdBy: string,
        readonly createdAt?: Date,
        readonly createdFrom?: string | null | undefined,
    ) {
        this.offering = this.offering !== null ? Number(this.offering.toFixed(2)) : null;
    }
}