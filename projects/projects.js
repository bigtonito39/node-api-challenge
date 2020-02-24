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

//-------------------POST to create a project
router.post("/", validateProjectBody(), (req, res, next) =>{
    projectDB.insert(req.body)
    .then(projecBody => {
        res.status(201).json(projecBody)
    })
    .catch( error => {
        next(error)
    })

})
//-----------------------------------------------ENDS HERE

//---------------------------------DELETE A PROJECT

router.delete("/:id",validateProjectID(), (req, res, next) => {
    projectDB.remove(req.params.id)
    .then(count => {
        //as long id is greater than 0 and a valid id is given this will run
        if (count > 0){
            res.status(200).json({
            message:"Project has been deleted"})
        }
        else {
            res.status(404).json({
                message: "Project to delete not found"
                
            })
        }
        
    })
    .catch( error => {
        next(error)
    })

} )
//-----------------------------------------------------------Ends here

//-----------updates a project

router.put("/:id",validateProjectBody(),validateProjectID(), (req, res, next) => {
    projectDB.update(req.params.id, req.body)
    .then (updatedProject => {
        if (updatedProject) {
            res.status(200).json(updatedProject)
        }else{
            res.status(404).json({
                message:"The project could not be found"
            })
        }
    
    })
      .catch(error=> {
          next(error)
      })

} )
//---------------------ends here


//-----Very important Endpoint here, get actions based on users id
//
router.get("/actions/:id", validateProjectID(), (req, res, next) => {
    //need to save ID here
    const id = req.params.id
    projectDB.getProjectActions(id)
     .then(actionsPerUser => {
         res.status(200).json(actionsPerUser)
     })
     .catch(error => {
         next(error)
     })

})

module.exports = router

