import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA6liUESccLLRjWJEYA842FTtz4EisrCoM",
  authDomain: "vuex-hacks.firebaseapp.com",
  databaseURL: "https://vuex-hacks.firebaseio.com",
  projectId: "vuex-hacks",
  storageBucket: "vuex-hacks.appspot.com",
  messagingSenderId: "85825240575",
  appId: "1:85825240575:web:7dcd1edd21d1bfb1f63bca",
  measurementId: "G-V26F7WQGPB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
if(typeof firebase.analytics === 'function') {
  firebase.analytics();
}


export const db = firebase.firestore();
export const dbChannels = db.collection('channels');

export const getCollectionMessages = (channelId) => {
  return db.collection(`channels/${channelId}/messages`);
};