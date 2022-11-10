// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCsSn_9NDfdNBQ-rO9mmpL9rpGcx8TDsH8",
//   authDomain: "astutephotography-4cfb6.firebaseapp.com",
//   projectId: "astutephotography-4cfb6",
//   storageBucket: "astutephotography-4cfb6.appspot.com",
//   messagingSenderId: "1052042299845",
//   appId: "1:1052042299845:web:a851850c520791fc3663ac",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
