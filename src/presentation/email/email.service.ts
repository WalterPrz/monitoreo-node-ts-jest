import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];
}
export interface Attachments {
    fileName: string,
    path: string,
}


export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    })
    constructor(
      
    ) { }
    async sendEmail(options: SendMailOptions): Promise<boolean> {
        try {
            const { to, subject, htmlBody, attachments = [] } = options
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            })
            // console.log(sentInformation)
            return true
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts'
            })
            return false
        }
    }
    sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3> Logs de sistema - NOC </h3>
            <p>texto de relleno</p>
            <p>Ver logs adjuntos</p>
        `;
        const attachments: Attachments[] = [
            { fileName: 'logs-low.log', path: './logs/logs-low.log' },
            { fileName: 'logs-medium.log', path: './logs/logs-medium.log' },
            { fileName: 'logs-high.log', path: './logs/logs-high.log' },
        ];
        return this.sendEmail({
            to, subject, attachments, htmlBody
        })
    }
}