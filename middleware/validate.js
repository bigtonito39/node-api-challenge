const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel")

function validateProjectBody() {
    return (req, res, next) => {
        if (!req.body) {
            res.status(400).json({
                message: "Missing Project Data"
            })
        } else if (!req.body.name || !req.body.description) {
            res.status(400).json({
                message:" Missing required name and description field"
            })
        }

        else{
            next()
        }
    }
}

function validateProjectID(id) {
    return (req, res, next) =>{
    projectDB.get(req.params.id)
    .then((project)=> {
       if (project) {
           req.project = project
           next() //move to the route handler, or next piece of middleware
       }else {
           res.status(404).json({
               message: " Invalid Project ID"
           })
       }
    }) 
     .catch( error => {
         next(error)
     })

    }
}

//Actions middleware from here down.

function validateActionBody() {
    return (req, res, next) => {
     if(!req.body){
         res.status(400).json({
             message:"Missing action data"
         })
     }
     else if(!req.body.project_id || !req.body.description || !req.body.notes){
      res.status(400).json({
          message: "Please Make sure to provide, Project ID, Description and a note"
      })
     }else{
         next()
     }
    }
}

function validateActionId() {
return (req, res, next) => {
    actionDB.get(req.params.id)
    .then(action => {
        if (action) {
            req.action = action
            next()
        }
        else{
res.status(404).json({
    message:"Invalid action ID"
})
        }
        
    })
  .catch( error => {
      next(error)
  })
}
}


module.exports = {
    validateProjectBody,
    validateProjectID,
    validateActionBody,
    validateActionId
}