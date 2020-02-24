module.exports = (format) => {
    return (req, res, next) => {
     const ip= req.ip
     const method = req.method
     const url = req.url
     const agent = req.get("user-agent")

     if (format === "short") {
       console.log(`${method} ${url}`)
     }
else {
    console.log(`${ip} ${method}  ${url}  ${agent}`)
      }

      next()
    }
}