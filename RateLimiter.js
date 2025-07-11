class RateLimiter {
    constructor(limit, interval) {
        this.limit = limit;
        this.interval = interval;
        this.timestamps = [];
    }

    allow() {
        const now = Date.now();
        this.timestamps = this.timestamps.filter(t => now - t < this.interval);
        if (this.timestamps.length >= this.limit) return false;
        this.timestamps.push(now);
        return true;
    }
}

module.exports = RateLimiter;
