const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";

router.get(["/", "home"], (req, res) => {
    const locals = {
        title: "Home",
    };

    // index.ejs 를 렌더링하는데 mainLayout 레이아웃으로 감싸기
    res.render("index", { locals, layout: mainLayout});
});

router.get("/about", (req, res) => {
    // about.ejs 를 렌더링하는데 mainLayout 레이아웃으로 감싸기
    res.render("about", {layout: mainLayout});
})

module.exports = router;