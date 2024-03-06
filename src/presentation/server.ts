import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { FileSystemDatasource } from "../intrastructure/datasources/file-system.datasource";
import { LogRespositoryImpl } from "../intrastructure/repositories/log.repository.impl";
import { MongoLogDatasource } from "../intrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../intrastructure/datasources/postgre-log.datasource";
const fsLogRepository = new LogRespositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRespositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRespositoryImpl(new PostgresLogDatasource());



const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...');
        // new SendEmailLogs(emailService, logRepository).execute(['@gmail.com', 'w@gmail.com'])



        // emailService.sendEmail({
        //     to: '@gmail.com', subject: 'Logs de sistema', htmlBody: `
        //     <h3> Logs de sistema - NOC </h3>
        //     <p>texto de relleno</p>
        //     <p>Ver logs adjuntos</p>
        // ` })


        // const logs = await logRepository.getLogs(LogSeverityLevel.low)
        // console.log(logs)

        // CronService.createJob('*/5 * * * * *', () => {
        //     const url = 'https://google.com'
        //     new CheckServiceMultiple(
        //         [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //         () => console.log(`El ${url} is ok`),
        //         (error) => console.log(error)
        //     ).execute(url)
        //     // new CheckService().execute('http://localhost:3000')
        // })
    }
}