const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asynchandelr = require("express-async-handler");

router.get(
    ["/", "home"],
    asynchandelr(async(req, res) => {
    const locals = {
        title: "Home",
    };

    const data = await Post.find({}); // DB에 있는 데이터 모두 가져오기
    // index.ejs 를 렌더링하는데 mainLayout 레이아웃으로 감싸기
    res.render("index", { locals, data, layout: mainLayout});
}));

/**
 * GET post/:id
 * 게시물 상세 보기
 */
router.get("/post/:id",
    asynchandelr(async (req, res) => {
        const data = await Post.findOne({ _id: req.params.id}); // 데이터 1개 가져오기
        res.render("post", {data, layout: mainLayout});
    })
);

router.get("/about", (req, res) => {
    // about.ejs 를 렌더링하는데 mainLayout 레이아웃으로 감싸기
    res.render("about", {layout: mainLayout});
})

module.exports = router;