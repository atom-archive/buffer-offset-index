var nbind = require('nbind');
var binding = nbind.init(__dirname + '/../');

var bind = binding.bind, lib = binding.lib;

var setupExports = require('./entry-common');
setupExports(module, bind, lib);
