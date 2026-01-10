# 🧪 LabBlog API

LabBlog is a modern and secure **Backend API** built for managing blogs, lab resources, and equipment usage.  
It follows **industry-standard architecture** with clean separation of concerns and scalable design.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Google OAuth + Email OTP (2FA)
- **Authorization:** Role-based Access Control (ADMIN, USER)
- **Architecture:** DTO + Service Layer Pattern

---

## 🔐 Authentication & Security

LabBlog uses a secure authentication flow:

1. User logs in using **Google**
2. If Two-Factor Authentication is enabled, backend responds with:
   ```json
   { "twoFactorRedirect": true }
   ```
