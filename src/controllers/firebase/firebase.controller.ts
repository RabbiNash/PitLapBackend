import admin from "firebase-admin";
import { readFileSync } from "fs";
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(
  readFileSync(process.env.FIR_SERVICE_ACCOUNT, "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const sendPushNotification = async () =>  {
    const message = {
      notification: {
        title: "Bahrain Preseason Test!",
        body: "Max Verstapped goes fastest with a 1.28.000",
      },
      topic: "practice"
    };
  
    try {
      const response = await admin.messaging().send(message);
      console.log("Notification sent successfully:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

export default admin;

