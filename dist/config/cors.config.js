"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = ['http://localhost:63342', 'http://localhost:4200', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    preflightContinue: true
};
exports.default = corsOptions;