import { url } from "inspector";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRespositoryImpl } from "../intrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../intrastructure/datasources/file-system.datasource";
const fileSystemLogRepository = new LogRespositoryImpl(new FileSystemDatasource)
export class Server {
    public static start() {
        console.log('Server started...');
        CronService.createJob('*/5 * * * * *', () => {
            const url = 'http://localhost:3000'
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`El ${url} is ok`),
                (error) => console.log(error)
            ).execute(url)
            // new CheckService().execute('http://localhost:3000')
        })
    }
}