const { lstatSync, readFileSync, lstat:ls, readFile:rf } = require('fs');
const { parse } = require('path');

//const render = require('../renderer')

const lstat = async(a) => {
    try {
        if (lstatSync(a.path)) {
            if (parse(a.path).ext !== '.mp3') {
                return false;
            } else {
                const { name } = parse(a.path);
                const { path } = a;
                return data = {
                    path,
                    name
                };
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

const base64_encode = (a) => {
    const image = readFileSync(a, {encoding: 'base64'})
    return image;
    //const image = readFileSync(a['filePaths'][0]);
    //return new Buffer(image).toString('base64');
}

const buffer = async(a) => {
    return new Promise((resolve, reject) => {
        ls(a, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                rf(a, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data)
                    }
                })
            }
        })
    })
}

module.exports = {
    lstat,
    base64_encode,
    buffer
}