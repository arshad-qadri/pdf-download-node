const { generatePdf } = require("../controller/generatepdf")
const { test } = require("../controller/test")

const router = require("express").Router()

router.post("/generate-pdf", generatePdf)
router.get("/test", test)



module.exports = router