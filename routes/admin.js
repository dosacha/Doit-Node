const express = require("express");
const router = express.Router();
const adminLayout = "../views/layouts/admin"
const adminLayout2 = "../views/layouts/admin-nologout"
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const asyncHandler = require("express-async-handler"); // try/catch 대신 사용하기 위해

/** 
 * Check Login
 */
const checkLogin = (req, res, next) => {
    const token = req.cookies.token; // 추가 정보 가져오기

    if(!token){
        res.redirect("/admin");
    }

    // 토큰이 있다면 토큰을 확인하고 사용자 정보를 요청에 추가하기
    try{
        const decoded = jwt.verify(token, jwtSecret); // 토큰 해석하기
        req.userId = decoded.userId; // 토큰의 사용자 ID를 요청에 추가하기
        next();
    }catch(error){
        res.redirect("/admin");
    }
};

/**
 * GET /admin
 * Admin page
 */
router.get("/admin", (req, res) => {
   const locals = {
    title: "관리자 페이지",
   }

   res.render("admin/index", { locals, layout: adminLayout2 });
});

/**
 * POST /admin
 * Check admin login
 */
router.post("/admin",
    asyncHandler(async(req, res) => {
        const { username, password } = req.body;

        // 사용자 이름으로 사용자 찾기
        const user = await User.findOne({ username });

        // 일치하는 사용자가 없으면 401 오류 표시
        if(!user){
            return res.status(401).json({ message: "일치하는 사용자가 없습니다."});
        }

        // 입력한 비밀번호와 DB에 저장된 비밀번호 비교
        const isValidPassword = await bcrypt.compare(password, user.password);

        // 비밀번호가 일치하지 않으면 401 오류 표시
        if(!isValidPassword){
            res.status(401).json({ message: "비밀번호가 일치하지 않습니다."});
        }

        // JWT 토큰 생성
        const token = jwt.sign({ id: user._id }, jwtSecret);

        // 토큰을 쿠키에 저장
        res.cookie("token", token, { httpOnly: true });

        // 로그인에 성공하면 전체 게시물 목록 페이지로 이동
        res.redirect("/allPosts");
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

/**
 * GET /allPosts
 * GET all posts
 */
router.get(
    "/allPosts",
    checkLogin, // 미들웨어를 사용해서 접근 권한이 있는지 확인
    asyncHandler(async (req, res) => {
        const locals = {
            title: "Posts",
        };
        const data = await Post.find(); // 전체 게시물 가져오기
        res.render("admin/allPosts", { // locals값과 data 넘기기
            locals,
            data, // Post 모델에서 저장된 자료를 모두 가져와 저장한 변수
            layout: adminLayout
        });
    })
);

/**
 * GET /logout
 * Admin logout
 */
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

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