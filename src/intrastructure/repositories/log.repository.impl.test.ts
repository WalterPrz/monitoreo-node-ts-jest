import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRespositoryImpl } from "./log.repository.impl"

describe("LogRepositoryImpl", () => {
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),

    }
    beforeEach(() => {
        jest.clearAllMocks()
    })
    const logRepositoryImpl = new LogRespositoryImpl(mockLogDatasource)

    test('saveLog should call a datasource with arguments', async () => {
        const log = { level: LogSeverityLevel.high, message: 'hola' } as LogEntity;
        await logRepositoryImpl.saveLog(log)
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)
    })
    test('getLogs should call a datasource with arguments', async () => {
        const lowSeverity = LogSeverityLevel.low
        await logRepositoryImpl.getLogs(lowSeverity)
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity)
    })
})