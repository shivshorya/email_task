class CircuitBreaker {
    constructor(failureThreshold, cooldownTime) {
        this.failureThreshold = failureThreshold;
        this.cooldownTime = cooldownTime;
        this.failures = 0;
        this.lastFailureTime = null;
    }

    failure() {
        this.failures++;
        this.lastFailureTime = Date.now();
    }

    success() {
        this.failures = 0;
    }

    isOpen() {
        if (this.failures < this.failureThreshold) return false;
        return Date.now() - this.lastFailureTime < this.cooldownTime;
    }
}

module.exports = CircuitBreaker;
