import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDngdgCDgVa19ONoyfrE3befCtcaNO-caI',
  authDomain: 'ordering-shop-422616.firebaseapp.com',
  projectId: 'ordering-shop-422616',
  storageBucket: 'ordering-shop-422616.appspot.com',
  messagingSenderId: '461371038231',
  appId: '1:461371038231:web:cd7b8fbb438470264eda52',
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
