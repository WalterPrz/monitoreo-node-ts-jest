import { url } from "inspector";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRespositoryImpl } from "../intrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../intrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/env.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
const fileSystemLogRepository = new LogRespositoryImpl(new FileSystemDatasource)
const emailService = new EmailService();

export class Server {
    public static start() {
        console.log('Server started...');
        new SendEmailLogs(emailService, fileSystemLogRepository).execute(['aledanielalopez@gmail.com', 'walter2perez@gmail.com'])



        // emailService.sendEmail({
        //     to: 'walter2perez@gmail.com', subject: 'Logs de sistema', htmlBody: `
        //     <h3> Logs de sistema - NOC </h3>
        //     <p>texto de relleno</p>
        //     <p>Ver logs adjuntos</p>
        // ` })

        // CronService.createJob('*/5 * * * * *', () => {
        //     const url = 'http://localhost:3000'
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`El ${url} is ok`),
        //         (error) => console.log(error)
        //     ).execute(url)
        //     // new CheckService().execute('http://localhost:3000')
        // })
    }
}