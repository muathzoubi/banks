import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1CEXPBCPgGyE9pdvRkYbs6XOeV_ahl_Y',
  authDomain: 'axzss-ce109.firebaseapp.com',
  databaseURL: 'https://axzss-ce109-default-rtdb.firebaseio.com',
  projectId: 'axzss-ce109',
  storageBucket: 'axzss-ce109.firebasestorage.app',
  messagingSenderId: '949547151410',
  appId: '1:949547151410:web:b15f6711938b3c38e78c2b',
  measurementId: 'G-P0XGQR21PZ',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
