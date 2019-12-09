import * as firebase from "firebase";

const config = {
  //API Key
};
firebase.initializeApp(config);

export const database = firebase.database().ref("/posts");
