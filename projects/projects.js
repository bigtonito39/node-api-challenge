const express = require("express")
const projectDB = require("../data/helpers/projectModel")
const { validateProjectBody , validateProjectID } = require("../middleware/validate");

const router = express.Router()


router.get("/", (req, res) => {
    projectDB.get()
    .then((response) => {
        if (response) {
            return res.status(200).json(response)
        } else{
            return res.status(404).json({
                message:"no projects were found"
            })
        }
    })
    .catch( error => {
        next(error)
    })
})

//...............................return a single project based on ID
router.get("/:id", validateProjectID(), (req, res, next) => {
    // "req.hub" comes from the "validateProjectID" middleware
    res.status(200).json(req.project)
   })
 /*  Same as doing this:              */           
// router.get("/:id", (req, res) => {
//     const id = req.params.id
//     projectDB.get(id)
//         .then((response) => {
//             if(response) {
//                 return res.status(200).json(response)
//             } else return res.status(404).json({ message: "ID does not exist." })
//         })
//         .catch((error) => {
//             return res.status(500).json(error)
//         })
// })
//..............................................................ENDS HERE

//------------------------------

module.exports = router

