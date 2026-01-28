import { CreateUseCase } from "../Report/application/useCase/CreateUseCase";
import { GetAllUseCase } from "../Report/application/useCase/GetAllUseCase";
import { GetBetweenDateUseCase } from "../Report/application/useCase/GetBetweenDatesUseCase";
import { GetOneByIdUseCase } from "../Report/application/useCase/GetOneByIdUseCase";
import { ApiReportRepository } from "../Report/infrastructure/api/ApiReportRepository";

const apiRepository = new ApiReportRepository();

export const ReportService = {
    create: new CreateUseCase(apiRepository),
    getAll: new GetAllUseCase(apiRepository),
    validateIsCurrentReportSent: new GetBetweenDateUseCase(apiRepository),
    getOneById: new GetOneByIdUseCase(apiRepository)
}