import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCN78-d_8vCnBC22ZeayqK2dSlvHzqhoqI',
  authDomain: 'fir-ca3ce.firebaseapp.com',
  projectId: 'fir-ca3ce',
  storageBucket: 'fir-ca3ce.appspot.com',
  messagingSenderId: '359767345663',
  appId: '1:359767345663:web:95db346330db185007bfca',
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);