import {
  Injectable,
  BadRequestException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly submissionTimestamps = new Map<string, number>();

  async handleContact(contactDto: ContactDto) {
    // Honeypot check: reject if company field is filled
    if (contactDto.company && contactDto.company.trim() !== '') {
      this.logger.warn('Honeypot triggered: company field filled', {
        email: contactDto.email,
      });
      throw new BadRequestException('Invalid submission');
    }

    // Timing-based spam detection: reject if submission is too fast
    const now = Date.now();
    const key = contactDto.email;
    const lastSubmission = this.submissionTimestamps.get(key);

    if (lastSubmission && now - lastSubmission < 2000) {
      this.logger.warn('Timing-based spam detected: submission too fast', {
        email: contactDto.email,
      });
      throw new UnprocessableEntityException('Please wait before submitting');
    }

    this.submissionTimestamps.set(key, now);

    // Topic-based routing (log topic for future email routing)
    const topic = contactDto.topic || 'other';
    this.logger.log('Contact form submission received', {
      name: contactDto.name,
      email: contactDto.email,
      topic,
      messageLength: contactDto.message.length,
    });

    // MVP: Log to console (replace with transactional email service post-MVP)
    console.log('--- CONTACT FORM SUBMISSION ---');
    console.log(`Name: ${contactDto.name}`);
    console.log(`Email: ${contactDto.email}`);
    console.log(`Topic: ${topic}`);
    console.log(`Message: ${contactDto.message}`);
    console.log('--------------------------------');

    // TODO: Integrate transactional email service (SendGrid, AWS SES, Resend)
    // await this.emailService.send({
    //   to: 'lukasz.luczak@luczak.consulting',
    //   from: 'noreply@lukaszpiotrluczak.me',
    //   subject: `Contact form: ${topic}`,
    //   text: `Name: ${contactDto.name}\nEmail: ${contactDto.email}\nTopic: ${topic}\n\n${contactDto.message}`,
    // });

    return {
      success: true,
      message: 'Message received',
    };
  }
}
