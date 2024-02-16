import { url } from "inspector";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRespositoryImpl } from "../intrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../intrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/env.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../intrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
const logRepository = new LogRespositoryImpl(
    new FileSystemDatasource()
    // new MongoLogDatasource()
)
const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...');
        // new SendEmailLogs(emailService, logRepository).execute(['aledanielalopez@gmail.com', 'walter2perez@gmail.com'])



        // emailService.sendEmail({
        //     to: 'walter2perez@gmail.com', subject: 'Logs de sistema', htmlBody: `
        //     <h3> Logs de sistema - NOC </h3>
        //     <p>texto de relleno</p>
        //     <p>Ver logs adjuntos</p>
        // ` })


        const logs = await logRepository.getLogs(LogSeverityLevel.low)
        console.log(logs)

        // CronService.createJob('*/5 * * * * *', () => {
        //     const url = 'https://godededogle.com'
        //     new CheckService(
        //         logRepository,
        //         () => console.log(`El ${url} is ok`),
        //         (error) => console.log(error)
        //     ).execute(url)
        //     // new CheckService().execute('http://localhost:3000')
        // })
    }
}