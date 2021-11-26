const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION: "mongodb://localhost:27017/burgir-spot",
    COOKIE_NAME: "SESSION_DATA",
    TOKEN_SECRET: "my private secret secret",
    SALT_ROUNDS: 10,
    CLOUDINARY: {
      cloud_name: "dyjdf3jmx",
      api_key: "579624264823148",
      api_secret: "DMgSYTcI9axXbDPqAssAihjgvtk"
    },
    CORS: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  },
};

module.exports = config[env];
