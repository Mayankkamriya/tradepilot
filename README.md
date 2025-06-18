# 🛠️ Trade Pilot – Project Bidding & Management System

**Developed by**: Mayank Kamriya  
**GitHub Repo**: [Git Hub](https://github.com/Mayankkamriya/tradepilot.git)  
**Live Demo**: [Trade Pilot](https://tradepilot-phi.vercel.app/)

---

## 📖 Introduction

**Trade Pilot** is a full-stack web application that enables:
- **Buyers** to post freelance projects.
- **Sellers** (freelancers) to bid on those projects.
- Seamless **project execution**, **status tracking**, and **deliverable submission** until completion.

---

## 🧰 Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Frontend   | [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) |
| Backend    | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) |
| Database   | [PostgreSQL](https://www.postgresql.org/) via [Prisma ORM](https://www.prisma.io/) |
| Email      | [Nodemailer](https://nodemailer.com/) |
| File Upload| [Multer](https://github.com/expressjs/multer) |
| Deployment | Vercel (Frontend & Backend) |

---

## 🏗️ System Architecture

### Frontend (Next.js)

#### Pages
- `/` – Home / Dashboard
- `/projects` – List of open projects
- `/projects/[id]` – Project details & bid submission
- `/dashboard` – Buyer/Seller dashboard

#### Components
- `ProjectCard` – Displays project brief
- `BidForm` – Allows sellers to submit bids
- `StatusTracker` – Tracks project status

---

## 🚀 Key Features

### 1. Project Creation (Buyer)
- Page: `/projects/new`
- Buyers can post new projects via a dynamic form.

### 2. Bidding System (Seller)
- Sellers view project details on `/projects/[id]` and place bids using the `BidForm`.

### 3. Seller Selection & Notifications
- Once a bid is accepted, the selected seller receives an email notification via **Nodemailer**.

### 4. Status Tracking & Deliverables
- **Status Flow**: `Pending → In Progress → Completed`
- File uploads handled via **Multer**.

### 5. Email Notifications
- Integrated email system for updates and bid confirmations.

---

## 🧾 Code Structure

```

/backend
├── prisma/
│   └── schema.prisma
├── routes/
│   ├── projects.js
│   └── bids.js
└── server.js

/frontend
├── pages/
│   ├── projects/
│   └── api/
├── components/
│   ├── ProjectCard.js
│   └── BidForm.js
└── styles/

````

---

## 🔒 Bonus Features (Optional)

- **Authentication** (JWT-based):  
  - `/api/auth/login` – Separate login endpoints for buyers and sellers.

---

## 🧪 Future Enhancements

-  Real-time chat between buyers and sellers
-  Payment gateway integration

---

## 🧑‍💻 Getting Started (Local Setup)

1. **Clone the repository**

```bash
git clone [(https://github.com/Mayankkamriya/tradepilot.git)]
````

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

* Create `.env` files.

4. **Run the project**

```bash
# For frontend
npm run dev

```

## 📬 Contact

**Prepared by**: Mayank Kamriya
📧 Email: [mayankkamriya305@gmail.com](mailto:mayankkamriya305@gmail.com)

---