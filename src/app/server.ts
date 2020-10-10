import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';

import CORS from 'cors';
import session from 'express-session';
import SessionFileStore from 'session-file-store';
import csrf from 'csurf';

import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { NOT_FOUND } from 'http-status-codes';
import 'express-async-errors';

import corsOptions from '../config/cors.config';
import IsAuthorized from './middlewares/isAuthorized';
import Header from './middlewares/Header';
import Auth from './middlewares/Auth';

import BaseRouter from './routes';
import logger from '@shared/Logger';

// Init express
const app = express();
const useDomainForCookies = process.env.DOMAIN || false
const host = process.env.HOST || 'localhost';
// https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
const corsMiddleware = CORS(corsOptions)

const FileStore = SessionFileStore(session);
const store = new FileStore({
    path: path.resolve(__dirname, '../tmp')
});

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../public/private.pem'), 'utf8'); 
const csrfProtection = csrf({
    cookie: {
      key: '_csrf',
      sameSite: true,
      httpOnly: true,
      domain: useDomainForCookies ? host : undefined
    }
  });

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true, limit: '200mb'}));
app.use(bodyParser.json({ limit: '200mb' }));
app.disable('x-powered-by');
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static('public'));
app.use(express.static("doc"));

app.use(compression());
app.use(corsMiddleware);
app.options('*', corsMiddleware);  

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

if (process.env.NODE_ENV !== 'test') {
  app.use(session({
    name: "SESSION_ID",
    secret: privateKey,
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    store: store,
    cookie: {
        sameSite: true,
        domain: useDomainForCookies ? host : undefined
      }
  }));
}

app.use(Header);

app.post('/api/authenticate', Auth);

app.get('/api', (req, res) => {
  res.json({ message: 'Node BFF' }); 
});

// Add APIs
if (process.env.NODE_ENV !== 'test') {
  app.use(IsAuthorized);  
  app.use('/api/v1', csrfProtection, BaseRouter);
}

if (process.env.NODE_ENV === 'test') {
  app.use('/api/v1', BaseRouter);
}

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(NOT_FOUND).json({
        errors: err, 
    });
});

export default app;