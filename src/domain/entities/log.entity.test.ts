import { LogEntity, LogSeverityLevel } from "./log.entity"

describe("log entity", () => {
    const dataObj = {
        message: 'Hola mundo',
        level: LogSeverityLevel.high,
        origin: 'logEntity.ts'
    }
    test("should create a LogEntity instance", () => {
        
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date)
    })
    test("should create a logEntity from JSON", () => {

        const json = '{"message":"https://googlddededee.com is not ok. TypeError: fetch failed","level":"high","createdAt":"2024-03-06T15:33:45.021Z","origin":"check-service.ts"}'
        const log = LogEntity.fromJson(json)
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('https://googlddededee.com is not ok. TypeError: fetch failed');
        expect(log.level).toBe(LogSeverityLevel.high);
        expect(log.origin).toBe('check-service.ts');
        console.log(log.createdAt)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test("should create log entity instance from Object",()=>{
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date)
    })

})