
export interface FamilyGroupRequest {
    id: string | null | undefined,
    name:string,
    color: string,
    teacher: string,
    anfitrion: string,
    meetingTime: string,
    meetingDay:string,
    leaders: string[]
}