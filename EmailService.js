const ProviderA = require('./providers/ProviderA');
const ProviderB = require('./providers/ProviderB');
const RateLimiter = require('../utils/RateLimiter');
const CircuitBreaker = require('../utils/CircuitBreaker');
const Logger = require('../utils/Logger');

class EmailService {
    constructor() {
        this.providers = [new ProviderA(), new ProviderB()];
        this.currentProviderIndex = 0;
        this.sentEmailIds = new Set(); // For idempotency
        this.statusMap = new Map();    // For tracking status
        this.rateLimiter = new RateLimiter(5, 60000); // 5 emails per 60s
        this.circuitBreaker = new CircuitBreaker(3, 10000); // 3 failures → 10s cooldown
    }

    async send(emailId, to, subject, body) {
        if (this.sentEmailIds.has(emailId)) {
            Logger.info(`Email ${emailId} already sent. Skipping.`);
            return { status: 'duplicate' };
        }

        if (!this.rateLimiter.allow()) {
            Logger.warn('Rate limit exceeded. Try again later.');
            return { status: 'rate_limited' };
        }

        let attempt = 0;
        let delay = 1000;

        while (attempt < 5) {
            if (this.circuitBreaker.isOpen()) {
                Logger.warn('Circuit breaker open. Rejecting send attempt.');
                return { status: 'circuit_breaker_open' };
            }

            const provider = this.providers[this.currentProviderIndex];

            try {
                await provider.send(to, subject, body);
                this.sentEmailIds.add(emailId);
                this.statusMap.set(emailId, 'sent');
                Logger.info(`Email ${emailId} sent via Provider${this.currentProviderIndex + 1}`);
                this.circuitBreaker.success();
                return { status: 'sent' };
            } catch (err) {
                Logger.error(`Attempt ${attempt + 1} failed: ${err.message}`);
                this.circuitBreaker.failure();
                attempt++;

                // Switch provider (fallback)
                this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;

                if (attempt < 5) await this._wait(delay);
                delay *= 2; // exponential backoff
            }
        }

        this.statusMap.set(emailId, 'failed');
        return { status: 'failed' };
    }

    getStatus(emailId) {
        return this.statusMap.get(emailId) || 'unknown';
    }

    _wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = EmailService;
