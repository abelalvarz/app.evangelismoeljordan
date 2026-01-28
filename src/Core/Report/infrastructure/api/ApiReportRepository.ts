import axios from "axios";
import { RoutesConfig } from "../../../Users/infrastructure/environment/routes.config";
import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { ReportDataMapper } from "./ReportMapper";


export class ApiReportRepository implements ReportRepository {
    async getOneById(id: string): Promise<Report | null> {
        const url = `${RoutesConfig.BASE_API_URL}/reports/${id}`;
        const response = await axios.get(url, this.getHeaders());
        return Promise.resolve(ReportDataMapper.fromApiResponse(response.data.data));
    }

    async create(report: Report): Promise<boolean> {
        const reportData = ReportDataMapper.toApiRequest(report);
        const response = await axios.post(`${RoutesConfig.BASE_API_URL}/reports`, reportData, this.getHeaders());
        console.log("Response Create Report:", response);
        return Promise.resolve(true);
    }

    async getWeeklyReportIfExists(start: Date, endDate: Date): Promise<Report[]> {
        
        console.log("Fetching reports between dates from API:", start, endDate);

        const startDateParam = start.toISOString().split('T')[0];
        const endDateParam = endDate.toISOString().split('T')[0];

        const response = await axios.get(`${RoutesConfig.BASE_API_URL}/reports/my-cell/exists-weekly-report?startDate=${startDateParam}&endDate=${endDateParam}`, 
            this.getHeaders());
        
        return Promise.resolve(ReportDataMapper.fromApiListResponse(response.data.data));
    }
    
    async getAllByFamilyGroupUser(): Promise<Report[]> {
        console.log("Fetching all reports from logged User:");
        const response = await axios.get(`${RoutesConfig.BASE_API_URL}/reports/my-cell`, this.getHeaders());
    
        return Promise.resolve(ReportDataMapper.fromApiListResponse(response.data.data));
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