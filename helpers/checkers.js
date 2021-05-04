const isURL = (a) => {
    if (a.indexOf("https://") == 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isURL
}