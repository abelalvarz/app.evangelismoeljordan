import axios from "axios";
import { RoutesConfig } from "../../../Users/infrastructure/environment/routes.config";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamilyGroupRepository";

export class ApiFamilyGroupRepository implements FamilyGroupRepository {
    async getAll(): Promise<FamilyGroup[]> {
        const response = await axios.get(`${RoutesConfig.BASE_API_URL}/cells/catalog`);
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

    // Deprecated: This method is not used in the current application flow
    async getById(id: string): Promise<FamilyGroup | null> {
        const response = await axios.get(`${RoutesConfig.BASE_API_URL}/cells/${id}`, this.getHeaders());
        const groupData = response.data;
        return Promise.resolve(new FamilyGroup(
            groupData.id,
            groupData.name,
            groupData.color,
            groupData.teacherName,
            groupData.anfitrion,
            groupData.leaders || [],
            groupData.meetingTime,
            groupData.meetingDay
        ));
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

    // TODO: Implement these methods or @Deprecated them in the interface
    create(familyGroup: FamilyGroup): Promise<boolean> {
        console.log("Method not implemented." + familyGroup);
        throw new Error("Method not implemented.");
    }

    update(familyGroup: FamilyGroup): Promise<boolean> {
        console.log("Method not implemented." + familyGroup);

        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        console.log("Method not implemented." + id);

        throw new Error("Method not implemented.");
    }
}