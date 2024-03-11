import nodemailer from 'nodemailer'
import { EmailService, SendMailOptions } from "./email.service"


describe("email.service.ts", () => {
    const mockSendMail = jest.fn()
    //? mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })
    beforeEach(() => {
        jest.clearAllMocks()
    })
    const emailService = new EmailService()
    test("should send email", async () => {
        const options: SendMailOptions = {
            to: 'google@google.com',
            subject: 'Test',
            htmlBody: '<h1>TEST</h1>'
        }
        await emailService.sendEmail(options)
        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>TEST</h1>",
            "subject": "Test",
            "to": "google@google.com",
        })
    })

    test('should send email with attachments', async () => {
        const email = 'jp@gmail.com'
        await emailService.sendEmailWithFileSystemLogs(email)
        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { fileName: 'logs-low.log', path: './logs/logs-low.log' },
                { fileName: 'logs-medium.log', path: './logs/logs-medium.log' },
                { fileName: 'logs-high.log', path: './logs/logs-high.log' },
            ])
        })
    })
})