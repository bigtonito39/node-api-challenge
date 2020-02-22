const projectDB = require("../data/helpers/projectModel");

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

module.exports = {
    validateProjectBody,
    validateProjectID
}