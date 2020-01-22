// Current DateTime function
function Now() {
    let date = new Date()
    let aaaa = date.getFullYear()
    let gg = date.getDate()
    let mm = (date.getMonth() + 1)

    if (gg < 10)
        gg = "0" + gg

    if (mm < 10)
        mm = "0" + mm

    let cur_day = aaaa + "-" + mm + "-" + gg

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    if (hours < 10)
        hours = "0" + hours

    if (minutes < 10)
        minutes = "0" + minutes

    if (seconds < 10)
        seconds = "0" + seconds

    return cur_day + " " + hours + ":" + minutes + ":" + seconds
}

// Get age by date of birth
function getAge(DOB) {
    let today = new Date()
    let birthDate = new Date(DOB)
    let age = today.getFullYear() - birthDate.getFullYear()
    let m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1
    }

    return age
}

// Random id generator
function randomID() {
    let text = ""
    let length = 32
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

// Random String generator of a lenght
function randomString(n) {
    let text = ""
    let length = n
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

// Random Number Generator of a length
function randomNumber(n) {
    let text = ""
    let length = n
    let possible = "0123456789"
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return parseInt(text)
}

// Random Generator of a length
function random(n) {
    let text = ""
    let length = n
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

// Check Array for uniqueness
function checkArrayUnique(array) {
    return array.length === new Set(array).size
}

module.exports.Now = Now
module.exports.getAge = getAge
module.exports.randomID = randomID
module.exports.random = random
module.exports.randomNumber = randomNumber
module.exports.randomString = randomString
module.exports.checkArrayUnique = checkArrayUnique