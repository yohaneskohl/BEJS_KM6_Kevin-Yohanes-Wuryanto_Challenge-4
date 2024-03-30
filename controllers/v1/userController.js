const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  register: async (req, res, next) => {
    try {
      let { name, email, password, identity_type, identity_number, address } =
        req.body;

      // Mengecek apakah email sudah digunakan sebelumnya
      let exist = await prisma.user.findFirst({ where: { email: email } });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "Email sudah digunakan!",
        });
      }

      // Membuat user baru beserta profil
      let user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          Profile: {
            create: { identity_type, identity_number, address },
          },
        },
        include: {
          Profile: true,
        },
      });

      res.status(201).json({
        status: true,
        message: "User data created successfully!",
        data: user,
      });
    } catch (error) {
      next(error); // Menangani kesalahan
    }
  },

  index: async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          Profile: true,
        },
      });

      res.status(200).json({
        status: true,
        message: "Data retrieved successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id); // Mendapatkan ID pengguna dari parameter permintaan
      const user = await prisma.user.findUnique({
        // Mencari pengguna berdasarkan ID
        where: { id: userId },
        include: { Profile: true }, // Sertakan juga profil pengguna
      });

      if (!user) {
        // Jika pengguna tidak ditemukan
        return res.status(404).json({
          status: false,
          message: "User not found",
          data: null,
          // include: {
          //     Profiles: true
          // }
        });
      }

      res.status(200).json({
        
        status: true,
        message: "User found",
        data: user,
      });
    } catch (error) {
      next(error); 
    }
  },
};
