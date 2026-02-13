# 💎 Smart Tracker Pro

A premium, responsive mobile web application designed for high-performance expense tracking. Built with a serverless architecture to ensure your financial data is always synced and secure.

---

## ✨ Features

### 💸 Financial Management
* *Add Income/Expenses:* Quick-entry forms with category selection and notes.
* *Real-time Balance:* Instant calculation of total balance, total income, and total spending.
* *History Log:* A 100% mirrored transaction log that tracks every entry with timestamps.
* *Category Totals:* Automatic grouping of spending (Food, Travel, Bills, etc.) for better insights.

### ⏱️ Smart Logic
* *Budget Guard:* Automatic system that triggers a warning when spending reaches *80% of total income*.
* *Auto-Sync:* Seamlessly pushes data to the cloud while maintaining a local backup.
* *User Profiles:* Personalized experience based on user login.

### ☁️ Cloud & Persistence
* *AWS Lambda Integration:* Serverless backend for reliable data processing.
* *DynamoDB Support:* Scalable NoSQL database storage for transaction logs.
* *Local Persistence:* Data remains available even if the device is offline.

### 📱 Premium Mobile UI
* *Vertical-Lock Design:* Engineered to prevent horizontal overflow for a native app feel.
* *Luxury Styling:* Built with Tailwind CSS, featuring rounded-[2rem] cards and soft-shadow depth.
* *Responsive:* Optimized for iPhone, Android, and Desktop browsers.

---

## 🛠️ Technology Stack

* *HTML5:* Semantic structure and mobile viewport optimization.
* *Tailwind CSS:* Modern utility-first styling and custom gradients.
* *JavaScript (ES6+):* Async/Await logic for API handling and LocalStorage management.
* *AWS Lambda:* Serverless Node.js backend functions.
* *Chart.js:* Visual data representation for spending reports.

---

## 🚀 How to Use

1. *Onboarding:* Enter your name on the startup screen to create your profile.
2. *Recording:* Use the "Add Income" or "Add Expense" buttons to log your transactions.
3. *Monitoring:* Check the Dashboard for your current "Savings Rate" and "Budget Health."
4. *History:* View the "All Records" page to see every transaction sorted by newest first.
5. *Settings:* Use the Setup page to update your name or reset your data.

---

## 🌐 API & Backend

The application communicates with a secure AWS REST API:
POST /prod/expense

*Payload Structure:*
```json
{
  "userId": "User_Name",
  "amount": 500,
  "category": "Food",
  "type": "Expense"
}

```
### Live link:
![App Link](https://d16w4xdpd2mb4d.cloudfront.net)
