const Response = require('../class/response')
const {verifyToken} = require('./function')

module.exports = function(req,res,next){
    const response = new Response(res)

    const authHeader = req.header('Authorization')
    if(!authHeader) return response.Fail(response.Unauthorized,'Authentication Needed')

    const token = authHeader.split(' ')[1]

    try{
        const verified = verifyToken(token)

        if(!verified) return response.Fail(response.Unauthorized,'invalid token')

        req.user = verified

        next()
    }catch(err){
        console.log(err);
        response.Fail(response.InternalServerError,'internal server error')
    }
}