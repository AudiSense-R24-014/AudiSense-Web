// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2QswCrBMMW7j_dLcX_rBOMiu4NV5ZFLQ",
  authDomain: "audisense-c9acd.firebaseapp.com",
  projectId: "audisense-c9acd",
  storageBucket: "audisense-c9acd.appspot.com",
  messagingSenderId: "109991801727",
  appId: "1:109991801727:web:9eb7c4293cf0b2b3f9204a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
