
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}
export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}
export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, origin, createdAt = new Date() } = options
        this.message = message;
        this.level = level;
        this.createdAt = createdAt
        this.origin = origin
    }
    //* conocido como factory constructor
    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json)
        //? se pueden agregar validaciones

        const log = new LogEntity({ message, level, createdAt, origin })
        log.createdAt = new Date(createdAt);
        return log

    }
}