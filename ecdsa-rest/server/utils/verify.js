function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateUsername(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

function validateRegister(req){
    let {username, email, password} = req

    username = username.trim()
    email = email.trim()
    password = password.trim()

    if (username === "") throw {type: "bad request", message: "username tidak boleh kosong"}   
    if (password === "") throw {type: "bad request", message:"password tidak boleh kosong"}
    if (email === "") throw {type: "bad request", message:"email tidak boleh kosong"}

    if (!validateUsername(username)) throw {type: "bad request", message: "username hanya boleh alphanumeric"}
    if (!validateEmail(email)) throw {type: "bad request", message: "format email tidak valid"}

    if (password.length  < 5) throw {type: "bad request", message: "password minimal 5 karakter"}

    return {
        username, email, password
    }
}

module.exports = {
    validateRegister
}