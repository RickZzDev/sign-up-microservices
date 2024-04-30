import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {


    use(req: Request, res: Response, next: Function) {
        const serviceAccountVar = require('../data/services/auth/google-services.json');

        getApps().length === 0
            ? firebase.initializeApp({ credential: firebase.credential.cert(serviceAccountVar) })
            : null;
        const token = req.headers.authorization;
        if (token != null && token != '') {

            firebase.auth().verifyIdToken(token.replace('Bearer ', ''))
                .then(async decodedToken => {
                    const user = {
                        email: decodedToken.email
                    }
                    req['user'] = user;
                    next();
                }).catch(error => {
                    console.error(error);
                    this.accessDenied(req.url, res);
                });
        } else {
            this.accessDenied(req.url, res)
        }
    }

    private accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied'
        });
    }
}