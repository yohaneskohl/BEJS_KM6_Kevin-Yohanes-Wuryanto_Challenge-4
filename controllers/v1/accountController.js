const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createAccount: async (req, res) => {
    // let userId = parseInt(req.params.id);
    let { bank_name, bank_account_number, balance, userId } = req.body;
    try {
      let user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      let newAccount = await prisma.bank_Accounts.create({
        data: {
          bank_name,
          bank_account_number,
          balance,
          User: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          User: true,
        },
      });
      res.status(200).json({
        status: true,
        message: "Data retrieved successfully",
        data: newAccount,
      });
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Menampilkan daftar akun
  index: async (req, res) => {
    try {
      let accounts = await prisma.bank_Accounts.findMany({
        include: {
          User: true,
        },
      });
      res.status(200).json({
        status: true,
        message: "Data retrieved successfully",
        data: accounts,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Menampilkan detail akun
  show: async (req, res) => {
    let account_id = parseInt(req.params.id);
    try {
      let account = await prisma.bank_Accounts.findUnique({
        where: { id: account_id },
        include: {
          User: true,
        },
      });
      if (!account) {
        return res.status(404).json({
          status: false,
          message: "User not found",
          data: null,
        });
      }
      res.status(200).json({
        // Jika pengguna ditemukan
        status: true,
        message: "User found",
        data: account,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
