var mobRegex = new RegExp("[0-9]{10}");
var bookingCodeRegex = new RegExp("[A-Z0-9]*[0-9]+[A-Z0-9]*");
var ignoreRegex = new RegExp("[Rr][Ss]");
var emailRegex = new RegExp("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$");
       
function isMobile(word, tag) {
    return tag=="CD" && mobRegex.test(word);
}

function isEmail(word) {
    return emailRegex.test(email);
}

function isBookingCode(word, tag) {
    return (tag=="NNP" && bookingIdRegex.test(word) && ((word).length == 14 || (word).length == 7) && (!ignoreRegex.test(word)))
}

function main(input, callback) {
    for(var i=0; i<input.raw; i++) {
        if (isMobile(input.raw[i].tag, input.raw[i].word))
            input.phone = input.raw[i].word
        if (isEmail(input.raw[i].word, input.word[i],tag)) input.contentEmail = input.raw[i].word
        if (isBookingCode(input.raw[i].word, input.word[i],tag)) input.bookingCode = input.raw[i].word
    }
    return callback(null, input);
}

module.exports = {
    main: main
}