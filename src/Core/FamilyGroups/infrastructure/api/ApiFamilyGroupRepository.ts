import axios from "axios";
import { RoutesConfig } from "../../../Users/infrastructure/environment/routes.config";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamilyGroupRepository";

export class ApiFamilyGroupRepository implements FamilyGroupRepository {
    async getAll(): Promise<FamilyGroup[]> {
        const response = await axios.get(`${RoutesConfig.BASE_API_URL}/cell`);
        const familyGroupsData = response.data;
        console.log(familyGroupsData);
        const familyGroups: FamilyGroup[] = familyGroupsData.data.map((groupData: any) => new FamilyGroup(
            groupData.id,
            groupData.name,
            groupData.color,
            groupData.teacherName,
            groupData.anfitrion,
            groupData.leaders || [],
            groupData.meetingTime,
            groupData.meetingDay
        ));
        return Promise.resolve(familyGroups);
    }

    getHeaders(): { headers: { [key: string]: string } } {
        const loggerUser = JSON.parse(localStorage.getItem('LOGGED_USER') || '{}');
        const token = loggerUser?.token || '';

        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    }
}