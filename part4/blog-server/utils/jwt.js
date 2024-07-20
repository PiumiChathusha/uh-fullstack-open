const jwt = require('jsonwebtoken')

const jwtSign = (id, username) => {
    const userForToken = {
        username,
        id,
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 }
    )

    return token;
}

module.exports = {
    jwtSign
}