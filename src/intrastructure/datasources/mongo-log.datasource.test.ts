import mongoose from "mongoose"
import { envs } from "../../config/plugins/env.plugin"
import { LogModel, MongoDatabase } from "../../data/mongo"
import { MongoLogDatasource } from "./mongo-log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"

describe("Pruebas en MongoDatasource", () => {
    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })
    const logDatasource = new MongoLogDatasource()
    const log = new LogEntity({ level: LogSeverityLevel.low, message: 'test', origin: 'mongo-log.datasource.test.ts' })
    afterEach(async () => {
        await LogModel.deleteMany()
    })
    afterAll(async () => {
        mongoose.connection.close()
    })
    test("should create a log", async () => {
        const logSpy = jest.spyOn(console, 'log');
        await logDatasource.saveLog(log)
        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created", expect.any(String))
    })
    test("should get logs", async () => {
        await logDatasource.saveLog(log)
        const logs =  await logDatasource.getLogs(LogSeverityLevel.low);
        expect(logs.length).toBe(1)
        expect(logs[0].level).toBe(LogSeverityLevel.low)
    })
})