import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyATcj4PSj8MW1DP8stqRPPYqsHy5yO2B9M",
  authDomain: "text-share-5e1d3.firebaseapp.com",
  projectId: "text-share-5e1d3",
  storageBucket: "text-share-5e1d3.appspot.com",
  messagingSenderId: "757453172129",
  appId: "1:757453172129:web:499922daeaeb81e2662fe0",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
