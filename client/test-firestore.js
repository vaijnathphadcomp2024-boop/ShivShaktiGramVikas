import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHfbKpo7zH6OmOva_kesHWjwKTi43zwko",
  authDomain: "shivshakti-622d6.firebaseapp.com",
  projectId: "shivshakti-622d6",
  storageBucket: "shivshakti-622d6.firebasestorage.app",
  messagingSenderId: "790464837333",
  appId: "1:790464837333:web:42586a6a3a51e95a1a145c",
  measurementId: "G-CWZ72K3XM7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestore() {
  try {
    console.log("Attempting to connect to Firestore...");
    const querySnapshot = await getDocs(collection(db, "testCollection"));
    console.log("Connected successfully! Found documents:", querySnapshot.size);
  } catch (error) {
    console.error("Firestore test failed:");
    console.error(error.message);
  }
}

testFirestore();
