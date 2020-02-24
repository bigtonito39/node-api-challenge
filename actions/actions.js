const express = require("express")
const actionsDB = require('../data/helpers/actionModel')
const {validateActionBody, validateActionId} = require("../middleware/validate")


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

router.post("/",validateActionBody(), (req, res, next) => {
  actionsDB.insert(req.body)
  .then(actionBody => {
      res.status(201).json(actionBody)
  })
   .catch( error => {
       next(error)
   })
})


module.exports = router