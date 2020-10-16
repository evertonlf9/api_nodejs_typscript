const allowedOrigins = ['http://localhost:63342', 'http://localhost:4200', 'http://localhost:3000']; // lista de exeção do cors

// const corsOptions = {
//     origin:  (origin: any, callback: Function) => {
//         if (allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback('error')
//         }
//     }
// }

// const corsOptions =  (origin: any, callback: Function) => {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true)
//     } else {
//         callback('error')
//     }
// }

const corsOptions = {
    origin(origin: any, callback: any){
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        let msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    preflightContinue: true
}

export default corsOptions;