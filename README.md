### Bank API

This repository contains an Express.js API for a simple banking system, with endpoints for user registration, account management, and transactions. The API utilizes Prisma as an ORM for interacting with a PostgreSQL database.

### Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/bank-api.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and specify your PostgreSQL database connection URL:

```plaintext
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### Running the API

To start the server, run:

```bash
npm start
```

The API will be accessible at `http://localhost:8000`.

### Endpoints

#### Users

- `POST /api/v1/users`: Create a new user with their profile.
  - Request body:

    ```json
    {
      "name": "karina",
      "email": "karina@gmail.com",
      "password": "password123",
      "identity_type": "KTP",
      "identity_number": "007",
      "address": "Surabaya"
    }
    ```

- `GET /api/v1/users`: Get a list of all users.

- `GET /api/v1/users/:userId`: Get detailed information about a specific user, including their profile.

#### Accounts

- `POST /api/v1/accounts`: Add a new account for a registered user.
  - Request body:

    ```json
    {
      "bank_name": "BCA",
      "bank_account_number": "0007",
      "balance": 5000000,
      "userId": 7
    }
    ```

- `GET /api/v1/accounts`: Get a list of all accounts.

- `GET /api/v1/accounts/:accountId`: Get detailed information about a specific account.

#### Transactions

- `POST /api/v1/transactions`: Send money from one account to another.
  - Request body:

    ```json
    {
      "source_account_id": 2,
      "destination_account_id": 1,
      "amount": 500
    }
    ```

- `GET /api/v1/transactions`: Get a list of all transactions.

- `GET /api/v1/transactions/:transactionId`: Get detailed information about a specific transaction, including sender and receiver.

### Technologies Used

- Node.js
- Express.js
- Prisma
- PostgreSQL

### Database Schema

The database schema follows these relations:

1. Each User can have multiple Accounts (One-to-Many between Users and Accounts).
2. Each Account is owned by only one User (Many-to-One between Accounts and Users).
3. Each User has only one Profile (One-to-One between Users and Profiles).
4. Each Profile is owned by only one User (One-to-One between Profiles and Users).
5. Each Account can have multiple Transactions (Many-to-Many between Accounts and Accounts through a Transaction table).

### License

This assignment is for the purposes of collecting the 4th Binar Challenge assignment

