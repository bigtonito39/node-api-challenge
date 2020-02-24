const express = require("express")
const actionsDB = require('../data/helpers/actionModel')
const {validateProjectBody, validateProjectID} = require("../middleware/validate")


const router = express.Router()

router.get("/", (req, res) => {
    actionsDB.get()
    .then((response) => {
        if (response) {
         return res.status(200).json(response)
        }
        else{
            return res.status(404).json({
                message:"Actions were not found"
            })
        }
    })
    .catch( error => {
        next(error)
    })
})


module.exports = router