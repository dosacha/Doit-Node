const mongoose = require("mongoose");
const asynchandelr = require("express-async-handler");
require("dotenv").config();

const connectDb = asynchandelr(async () => {
    // .env 파일에 있는 MONGDB_URI 값을 사용해 접속
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB connectd: ${connect.connection.host}`); // DB 연결 성공 시 터미널에 출력
});

module.exports = connectDb;