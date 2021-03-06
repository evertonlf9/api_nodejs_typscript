const fs = require('fs-extra');
const childProcess = require('child_process');


try {
    // Remove current build
    fs.removeSync('./dist/');
    // Copy front-end files
    fs.copySync('./public', './dist/public');
    fs.copySync('./doc', './dist/doc');
    // fs.copySync('./src/views', './dist/views');
} catch (err) {
    console.log(err);
}
