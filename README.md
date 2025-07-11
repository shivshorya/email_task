# 📧 Resilient Email Sending Service

This project is a Python-based fault-tolerant email sending system that ensures reliable email delivery even in the presence of temporary failures. It implements **retry mechanisms**, **error logging**, and **modular code design** to make the service production-ready.

---

## 🚀 Project Goal

The goal is to build a robust and modular service that can:
- Handle email failures gracefully (like network issues or server errors)
- Retry sending based on configurable rules
- Log all attempts for traceability
- Be easily configurable and extensible

---

## 🛠️ Features

- ✅ **Retry mechanism** using exponential backoff
- ✅ **Logging** of success, failure, and retry events
- ✅ **SMTP configuration** using environment or config file
- ✅ **Separation of concerns** through modular code (utils/config)
- ✅ **Pluggable design** – can be integrated with other systems

---

## 🧩 Project Structure

