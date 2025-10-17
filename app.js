require("dotenv").config(); // env에 있는 변수 가져오기
const express = require("express");

const app = express();
const port = process.env.PORT || 3000; // .env에 PORT가 없으면 3000번 PROT 사용

// 루트로 접속하면 routes/main.js 의 라우트 사용
app.use("/", require("./routes/main"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});