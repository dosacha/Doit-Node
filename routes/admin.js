const express = require("express");
const router = express.Router();
const adminLayout = "../views/layouts/admin"
const adminLayout2 = "../views/layouts/admin-nologout"
const bcrypt = require("bcrypt");
const User = require("../models/User");

const asyncHandler = require("express-async-handler"); // try/catch 대신 사용하기 위해

/**
 * GET /admin
 * Admin page
 */
router.get("/admin", (req, res) => {
   const locals = {
    title: "관리자 페이지",
   }
});

/**
 * POST /admin
 * Check admin login
 */
router.post("/admin",
    asyncHandler(async(req, res) => {
        const { username, password } = req.body;

        if(username === "admin" && password === "admin"){
        res.send("Success");
        }else{
        res.send("Fail");
        }
    })
);

/**
 * GET /register
 * Register administator
 */
router.get("/register",
    asyncHandler(async(req, res) => {
        res.render("admin/index", { layout: adminLayout2 });
    })
);

// /**
//  * POST /register
//  * Register administator
//  */
// router.post(
//   "/register",
//   asyncHandler(async (req, res) => {
//     const hashedPaswword = await bcrypt.hash(req.body.password, 10); // 비밀번호 암호화
//     const user = await User.create({
//         username: req.body.username,
//         password: hashedPaswword,
//     });
//     res.json(`user created: ${user}`); // 성공하면 메시지 출력
//   })
// );

module.exports = router;