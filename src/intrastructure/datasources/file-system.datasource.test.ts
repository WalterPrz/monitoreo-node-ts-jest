import fs from "fs"
import path from "path"
import { FileSystemDatasource } from "./file-system.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogModel } from "../../data/mongo"

describe("file-system.datasource.test.ts", () => {
    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    })

    test("should create log file if they do not exist.", () => {
        new FileSystemDatasource()
        const files = fs.readdirSync(logPath)
        expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log'])
    })
    test("should save a log in all logs-low.log ", () => {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test',
            origin: 'file-system.datasoyrce.test.ts'
        })
        logDatasource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
        expect(allLogs).toContain(JSON.stringify(log))
    })
    test("should save a log in all logs-low.log and logs-medium.log", () => {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test',
            origin: 'file-system.datasoyrce.test.ts'
        })
        logDatasource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
        const meidumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
        expect(allLogs).toContain(JSON.stringify(log))
        expect(meidumLogs).toContain(JSON.stringify(log))
    })
    test("should save a log in all logs-low.log and logs-high.log", () => {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test',
            origin: 'file-system.datasoyrce.test.ts'
        })
        logDatasource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')
        expect(allLogs).toContain(JSON.stringify(log))
        expect(highLogs).toContain(JSON.stringify(log))
    })
    test("should return all logs", async () => {
        const logDatasource = new FileSystemDatasource();
        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'log-low',
            origin: 'low'
        })
        const mediumLog = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'log-medium',
            origin: 'medium'
        })
        const highLog = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'log-high',
            origin: 'high'
        })
        await logDatasource.saveLog(logLow)
        await logDatasource.saveLog(mediumLog)
        await logDatasource.saveLog(highLog)
        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low)
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium)
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high)
        expect(logsLow).toEqual(expect.arrayContaining([logLow, mediumLog, highLog]))
        expect(logsMedium).toEqual(expect.arrayContaining([mediumLog]))
        expect(logsHigh).toEqual(expect.arrayContaining([highLog]))
    })
    test('should not throw an error if path exist', () => {
        new FileSystemDatasource();
        new FileSystemDatasource();
        expect(true).toBeTruthy()
    })
    test('should not throw an error if path exist', async () => {
        const logDatasource = new FileSystemDatasource();
        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low)
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium)
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high)
        expect(logsLow).toEqual([])
        expect(logsMedium).toEqual([])
        expect(logsHigh).toEqual([])
    })
    test('should throw an error if severity level is not defined', async () => {
        const logDatasource = new FileSystemDatasource();
        const CustomSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;
        try {
            await logDatasource.getLogs(CustomSeverityLevel)
            expect(true).toBeFalsy()//*Nunca se deberia de ejecutar
        } catch (error) {
            const errorString = `${error}`
            expect(errorString).toContain(`${CustomSeverityLevel} Not implemented`)
        }
    })
})