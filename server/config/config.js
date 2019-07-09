var env = process.env.NODE_ENV || 'development';

var config = require('./config.json');
var obj = {};
if(env === 'development' || env === 'test') {
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        if(key === 'firebaseConfig')
            obj.firebaseConfig = envConfig[key];
        process.env[key] = envConfig[key];
    });
}

module.exports = obj;