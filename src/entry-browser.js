var setupExports = require('./entry-common');

var hasRan = false;

var bind = null, lib = {};
var asmjs = require('../build/Release/nbind.js')

asmjs(lib, function (err, parts) {

    if (err)
        return;

    hasRan = true;
    bind = parts.bind;

});

if (!hasRan)
    throw new Error('This module hasn\'t been correctly initialized');

setupExports(module, bind, lib);
