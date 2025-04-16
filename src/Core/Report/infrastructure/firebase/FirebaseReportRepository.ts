import { collection, doc, getDocs, getFirestore, query, setDoc, Timestamp, where } from "firebase/firestore";
import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";

const firebase = getFirestore();
const COLLECTION_NAME = "Reports";
export class FirebaseReportRepository implements ReportRepository {

    async create(report: Report): Promise<boolean> {
        try {
            const docRef = doc(collection(firebase, COLLECTION_NAME));
            await setDoc(docRef, {
                familyGroup: report.familyGroup,
                meetingDate: report.meetingDate,
                activeMembers: report.activeMembers,
                activeMembersChildren: report.activeMembersChildren,
                noActiveMembers: report.noActiveMembers,
                noActiveMembersChildren: report.noActiveMembersChildren,
                visitorChildren: report.visitorChildren,
                visitors: report.visitors,
                totalAttendance: report.totalAttendance,
                newChrisitians: report.newChristians,
                reconciled: report.reconciled,
                vigilAttendance: report.vigilAttendance,
                visitedHomes: report.visitedHomes,
                offering: report.offering,
                comments: report.comments,
                createdBy: report.createdBy,
                createdAt: new Date(),
                createdFrom: "APP",
            })
            return Promise.resolve(true)

        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getAllByFamilyGroup(id: string): Promise<Report[]> {
        const querySnap = query(collection(firebase, COLLECTION_NAME), where("familyGroup.id", "==", id))
        const docs = await getDocs(querySnap)
        const convertedDocs = docs.docs.map((doc) => {
            const data = doc.data()
            return new Report(
                doc.id,
                data?.familyGroup,
                new Date(data?.meetingDate.seconds * 1000),
                data?.activeMembers,
                data?.activeMembersChildren,
                data?.noActiveMembers,
                data?.noActiveMembersChildren,
                data?.visitorChildren,
                data?.visitors,
                data?.totalAttendance,
                data?.newChrisitians,
                data?.reconciled,
                data?.vigilAttendance,
                data?.visitedHomes,
                data?.offering,
                data?.comments,
                data?.createdBy,
                data?.createdAt,
                data?.createdFrom
            )
        })
        return Promise.resolve(convertedDocs)
    }
    
    async getAllBetweenDatesAndGroupId(startDate: Date, endDate: Date, familyGroupId: string): Promise<Report[]> {
        const startTimeStamp = Timestamp.fromDate(startDate)
        const endTimeStamp = Timestamp.fromDate(endDate)
        const querySnap = query(collection(firebase, COLLECTION_NAME),
            where("familyGroup.id", "==", familyGroupId),
            where("meetingDate", ">=", startTimeStamp),
            where("meetingDate", "<=", endTimeStamp))

        const docs = await getDocs(querySnap)
        const convertedDocs = docs.docs.map((doc) => {
            const data = doc.data()
            return new Report(
                doc.id,
                data?.familyGroup,
                new Date(data?.meetingDate.seconds * 1000),
                data?.activeMembers,
                data?.activeMembersChildren,
                data?.noActiveMembers,
                data?.noActiveMembersChildren,
                data?.visitorChildren,
                data?.visitors,
                data?.totalAttendance,
                data?.newChrisitians,
                data?.reconciled,
                data?.vigilAttendance,
                data?.visitedHomes,
                data?.offering,
                data?.comments,
                data?.createdBy,
                data?.createdAt,
                data?.createdFrom
            )
        })
        return Promise.resolve(convertedDocs)
    }

}