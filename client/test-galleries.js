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

async function test() {
  const snap = await getDocs(collection(db, "galleries"));
  console.log("Total galleries docs:", snap.size);
  snap.forEach(d => console.log(d.id, "=>", d.data()));
}

test();
