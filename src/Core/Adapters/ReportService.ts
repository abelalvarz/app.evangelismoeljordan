import { CreateUseCase } from "../Report/application/useCase/CreateUseCase";
import { GetAllUseCase } from "../Report/application/useCase/GetAllUseCase";
import { GetBetweenDateUseCase } from "../Report/application/useCase/GetBetweenDatesUseCase";
import { FirebaseReportRepository } from "../Report/infrastructure/firebase/FirebaseReportRepository";

const repository = new FirebaseReportRepository()
export const ReportService = {
    create: new CreateUseCase(repository),
    getAll: new GetAllUseCase(repository),
    getExistReportForDate: new GetBetweenDateUseCase(repository)
}