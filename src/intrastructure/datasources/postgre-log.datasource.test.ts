import mongoose from "mongoose"

import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { PrismaClient, SeverityLevel, } from "@prisma/client"
import { PostgresLogDatasource } from "./postgre-log.datasource"

describe("Pruebas en PostgreDatasource", () => {
    let prismaClient: PrismaClient;
    beforeAll(async () => {
        prismaClient = new PrismaClient();
    })
    beforeEach(() => {
        prismaClient.logModel.create = jest.fn()
    })
    const severityEnum = {
        low: SeverityLevel.LOW,
        medium: SeverityLevel.MEDIUM,
        high: SeverityLevel.HIGH
    }
    const logDatasource = new PostgresLogDatasource()
    const log = new LogEntity({ level: LogSeverityLevel.low, message: 'test', origin: 'mongo-log.datasource.test.ts' })
    afterEach(async () => {

    })
    afterAll(async () => {
        prismaClient.$disconnect()
    })
    test("should create a log", async () => {
        // jest.spyOn(prismaClient.logModel, 'create').mockResolvedValue({ id: 1, message: "string", origin: "string", level: SeverityLevel.LOW, createdAt: new Date });
        // await logDatasource.saveLog(log)


        // expect(prismaClient.logModel.create).toHaveBeenCalled()
    })
    // test("should get logs", async () => {
    //     await logDatasource.saveLog(log)
    //     const logs =  await logDatasource.getLogs(LogSeverityLevel.low);
    //     expect(logs.length).toBe(1)
    //     expect(logs[0].level).toBe(LogSeverityLevel.low)
    // })
})