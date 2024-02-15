import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;
export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {

    }
    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error un check service ${url}`)
            }
            this.successCallback && this.successCallback();
            const log = new LogEntity(`Service  ${url} working`, LogSeverityLevel.low)
            this.logRepository.saveLog(log)
            return true
        } catch (error) {
            const erroMessage = `${url} is not ok. ${error}`
            const log = new LogEntity(erroMessage, LogSeverityLevel.high)
            this.logRepository.saveLog(log)
            this.errorCallback && this.errorCallback(erroMessage)
            return false
        };


    }
}