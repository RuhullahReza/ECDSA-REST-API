const bcrypt = require('bcryptjs');
const { createHash } = require('crypto');
const EllipticCurve = require('../class/ecdsa')

const hash =  string => createHash('sha256').update(string).digest('hex');

const createToken = (payload) => {
    const ECDSA = new EllipticCurve()
 
    let header = {
        "alg": "ES256",
        "typ": "JWT"  
    }

    header = JSON.stringify(header)
    
    payload = JSON.stringify(payload)

    const Hm = hash(`${header}.${payload}`) 
    const signature = ECDSA.sign(Hm)

    const token = `${btoa(header)}.${btoa(payload)}.${btoa(signature.toString())}`

    return token
}

const verifyToken = (token) => {  
    try {
        const ECDSA = new EllipticCurve()
        let [header,payload,signature]= token.split('.')

        const Hm = hash(`${atob(header)}.${atob(payload)}`)
        signature = atob(signature).split(',').map(element => parseInt(element,10));

        const signatureList = [];
        while(signature.length) signatureList.push(signature.splice(0,2))

        const validToken = ECDSA.verify(Hm,signatureList)
        if (!validToken) return false

        return JSON.parse(atob(payload))
    } catch (error) {
        return false
   }
}

const checkPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

module.exports = {
    checkPassword,
    createToken,
    verifyToken
}