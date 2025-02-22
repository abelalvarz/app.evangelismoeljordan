import { FamilyGroup } from "../../domain/types/FamilyGroup";

export interface CreateReportRequest {
    id: string | null | undefined,
    familyGroup: FamilyGroup | null,
    meetingDate: Date,
    activeMembers: number | null,
    activeMembersChildren: number | null,
    noActiveMembers: number | null,
    noActiveMembersChildren: number | null,
    visitorChildren: number | null,
    visitors: number | null,
    totalAttendance: number | null,
    newChristians: number | null,
    reconciled: number | null,
    visitedHomes: number | null,
    vigilAttendance: number | null,
    offering: number | null,
    comments: string
}