import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBQMd2Lxx2Q14uTvwaySbvypIMioS1rWg4",
  authDomain: "e-commerce-493b5.firebaseapp.com",
  projectId: "e-commerce-493b5",
  storageBucket: "e-commerce-493b5.appspot.com",
  messagingSenderId: "517663191570",
  appId: "1:517663191570:web:306d81c322e4ed280c1ecb",
  measurementId: "G-6K4Z2GHLLR",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};
firebase.initializeApp(config);

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
