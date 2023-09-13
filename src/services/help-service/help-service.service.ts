import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpServiceService {
    constructor(private _mailerService: MailerService,) {
    }

    async mailInformation(content: any): Promise<any> {
        console.log(content);
        // const image_dir = __dirname + 'src/email/mail/templates/assets/welcome_mail_template_image.png';
        const { name, siteLink, toemail, fromemail, subject, templateFile, baseString,verificationCode } = content;

        await this._mailerService.sendMail({
            to: toemail,
            from: process.env.MAIL_FROM_ADDRESS,
            subject: subject != '' ? subject : 'Welcome  Email',
            template: templateFile,
            context: {
                // name, isLinkExist, image_dir,baseString
                name, isLinkExist: siteLink ,verificationCode
            },
        });
    }
}
