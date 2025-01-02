import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});
export default admin;