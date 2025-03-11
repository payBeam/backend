# **PayBeam Backend**

![PayBeam Logo](https://via.placeholder.com/150) <!-- Add your logo here -->

PayBeam is a blockchain-based crypto payment processing platform that enables businesses and individuals to accept and make payments using cryptocurrencies. This repository contains the backend implementation of PayBeam, built with **Node.js**, **Express**, **PostgreSQL**, **Prisma ORM**, and **Docker**.

---

## **Features**

- **Crypto Payment Gateway**: Accept payments in multiple cryptocurrencies.
- **Non-Custodial Transactions**: Direct wallet-to-wallet transfers.
- **Lightning Network Integration**: Fast and low-cost Bitcoin transactions.
- **Merchant Dashboard**: Track transactions and generate reports.
- **Subscription Payments**: Support for recurring billing.
- **Secure & Scalable**: Built with production-ready technologies.

---

## **Technologies Used**

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Docker
- **API Documentation**: Swagger (optional)
- **Environment Management**: Dotenv

---

## **Getting Started**

Follow these instructions to set up the PayBeam backend locally or in a production environment.

### **Prerequisites**

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- Docker (optional, for containerization)
- Prisma CLI (`npm install -g prisma`)

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/payBeam/backend.git
cd backend
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/paybeam?schema=public"
PORT=5000
```

Replace `user`, `password`, and `paybeam` with your PostgreSQL credentials.

### **4. Run Database Migrations**

Use Prisma to generate and apply database migrations:

```bash
npx prisma migrate dev --name init
```

### **5. Start the Development Server**

```bash
npm run dev
```

The server will start at `http://localhost:5000`.

---

## **Running with Docker**

To run the application and database in Docker containers:

1. **Build and Start Containers**

   ```bash
   docker-compose up --build
   ```

2. **Access the Application**

   The backend will be available at `http://localhost:5000`.

3. **Stop Containers**

   ```bash
   docker-compose down
   ```

---

## **API Endpoints**

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/api/users`      | Fetch all users                 |
| POST   | `/api/users`      | Create a new user               |
| GET    | `/api/transactions` | Fetch all transactions         |
| POST   | `/api/transactions` | Create a new transaction       |

For detailed API documentation, refer to the [Swagger UI](#) (if implemented).

---

## **Project Structure**

```
paybeam-backend/
├── src/
│   ├── controllers/       # Route controllers
│   ├── routes/            # API route definitions
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── prisma/            # Prisma schema and migrations
│   ├── app.ts             # Express app configuration
│   └── server.ts          # Server entry point
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── package.json           # Node.js dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

---

## **Contributing**

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- Built with ❤️ by Dunsin.
- Inspired by the need for seamless crypto payment solutions.

---

## **Contact**

For questions or feedback, reach out to:

- **Email**: workdunsin@gmail.com
- **GitHub**: [Dunsin-cyber](https://github.com/Dunsin-cyber)
- **Twitter**: [@Dunsin](https://twitter.com/Abisuwa_Dunsin)
