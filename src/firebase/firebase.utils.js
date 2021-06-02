import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
        apiKey: "AIzaSyBQMd2Lxx2Q14uTvwaySbvypIMioS1rWg4",
        authDomain: "e-commerce-493b5.firebaseapp.com",
        projectId: "e-commerce-493b5",
        storageBucket: "e-commerce-493b5.appspot.com",
        messagingSenderId: "517663191570",
        appId: "1:517663191570:web:306d81c322e4ed280c1ecb",
        measurementId: "G-6K4Z2GHLLR"

};
firebase.initializeApp(config);

export const auth= firebase.auth();
export const firestore= firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;