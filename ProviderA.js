// === FILE: ProviderA.js (same structure for ProviderB.js with slight message change) ===
class ProviderA {
    async send(to, subject, body) {
        // Simulate random failure
        if (Math.random() < 0.5) throw new Error("ProviderA failed");
        console.log(`ProviderA sent email to ${to}: ${subject}`);
    }
}

module.exports = ProviderA;
