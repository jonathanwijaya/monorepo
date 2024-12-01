import * as admin from "firebase-admin";
import { serviceAccount } from "../service-account";
import "dotenv/config";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

export default db;
