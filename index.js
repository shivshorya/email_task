const EmailService = require('./src/email/EmailService');

(async () => {
    const service = new EmailService();
    const result = await service.send('1', 'you@example.com', 'Hi there', 'This is a test email!');
    console.log(result);
})();
