import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCDRUjTCHIIUJ2ASVMPt5dzktbOA4sqtIg",
  authDomain: "kanban-kuchkarov.firebaseapp.com",
  projectId: "kanban-kuchkarov",
  storageBucket: "kanban-kuchkarov.appspot.com",
  messagingSenderId: "134149371363",
  appId: "1:134149371363:web:065af5e00861b5331c5cd6",
  measurementId: "G-WC1WBRY8LW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export default app;
export { db, auth };
