const {Users} = require('../models')
const Response = require("../class/response");
const {checkPassword,createToken} = require('../utils/function')
const {validateRegister} = require('../utils/verify')

const register = async (req,res) => {
    const response = new Response(res)
    try {
        const {username, email, password} = validateRegister(req.body)

        const foundUser = await Users.findOne({where : {email}})
        if (foundUser) return response.Fail(response.BadRequest,"email sudah digunakan")

        const newUser = await Users.create({username,email,password})

        if (newUser) return response.Success(response.Created,`berhasil mendaftarkan user baru`)

    } catch (error) {
        if (error.type === "bad request") return response.Fail(response.BadRequest, error.message)
        return response.Fail(response.InternalServerError,"internal server error")
    }
}

const login = async (req,res) => {
    const response = new Response(res)
    const {email,password} = req.body
    try {
        const foundUser = await Users.findOne({where:{email}})
        if (!foundUser) return response.Fail(response.BadRequest,"email atau password salah")

        const validPassword = checkPassword(password, foundUser.password)
        if (!validPassword) return response.Fail(response.BadRequest,"email atau password salah")

        const payload = {
            username : foundUser.username,
            email : foundUser.email,
        }

        const data  = {
            token : createToken(payload) 
        }

        return response.Success(response.Ok,data)

    } catch (error) {
        return response.Fail(response.InternalServerError,"internal server error")   
    }
}

const protected = async (req,res) => {
    const response = new Response(res)
    try {
        const {username} = req.user
        return response.Success(response.Ok,`halo ${username}`)
    } catch (error) {    
        return response.Fail(response.InternalServerError,"internal server error")  
    }
}

module.exports = {
    register,
    login,
    protected
}