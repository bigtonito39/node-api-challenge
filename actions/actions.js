const express = require("express")
const actionsDB = require('../data/helpers/actionModel')
const {validateActionBody, validateActionId} = require("../middleware/validate")


const router = express.Router()
//get list of actions
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

//get specific action based on id:
router.get("/:id",validateActionId(), (req, res, next) => {
    actionsDB.get(req.params.id)
    .then(response => {
        if (response){
            res.status(200).json(response)
        }
        else{
            return res.status(404).json({
                message:"Specific action with this ID was not found"
            })
        }
    })
    .catch(error => {
        next(error)
    })
} )

router.post("/",validateActionBody(), (req, res, next) => {
  actionsDB.insert(req.body)
  .then(actionBody => {
      res.status(201).json(actionBody)
  })
   .catch( error => {
       next(error)
   })
})



router.put("/:id",validateActionId(),validateActionBody(), (req, res, next) =>{
    actionsDB.update(req.params.id, req.body)
    .then(updatedAction => {
        if(updatedAction) {
            res.status(200).json(updatedAction)
        }
        else {
            res.status(404).json({
                message:"The action could not be found"
            })
        }
        
    })
    .catch(error => {
next(error)
    })
} )

router.delete("/:id",validateActionId(), (req, res, next) => {
   
    actionsDB.remove(req.params.id)

    .then(deletedAction => {
        if (deletedAction > 0) {
            res.status(200).json({
                message: "Action has been deleted"
            })
        } else {
            res.status(404).json({
                message:"Actions to delete found"
            })
        }
    })
      .catch(error => {
          next(error)
      })
} )

module.exports = router