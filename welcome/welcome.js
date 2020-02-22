const express = require("express")

const router = express.Router()

router.get("/", (req, res)=>{
res.send(`
<h1>Welcome to the project making API<h1/>
`)

})

router.get("/api", (req, res) => {
    res.json({
        message:"Hello frontEnd!, make project MAKER page with my API"
    })
})

module.exports = router;