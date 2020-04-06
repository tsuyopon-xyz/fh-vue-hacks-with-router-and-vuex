import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBFEFd1iYiy0r_x6l3Ldao3HOcFT86VB3A",
  authDomain: "vue-hacks-b1415.firebaseapp.com",
  databaseURL: "https://vue-hacks-b1415.firebaseio.com",
  projectId: "vue-hacks-b1415",
  storageBucket: "vue-hacks-b1415.appspot.com",
  messagingSenderId: "681190762344",
  appId: "1:681190762344:web:ea244d511029f1395258dd",
  measurementId: "G-JYBY9W56GE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
export const dbChannels = db.collection('channels');

export const getCollectionMessages = (channelId) => {
  return db.collection(`channels/${channelId}/messages`);
};