const assert = require('assert');
const EmailService = require('../src/email/EmailService');

(async () => {
    const service = new EmailService();
    const emailId = 'email123';

    const result1 = await service.send(emailId, 'text@example.com', 'Hello', 'Test Body');
    assert(result1.status === 'sent' || result1.status === 'failed');

    const result2 = await service.send(emailId, 'test@example.com', 'Hello', 'Test Body');
    assert.strictEqual(result2.status, 'duplicate');

    console.log('✅ All tests passed');
})();
