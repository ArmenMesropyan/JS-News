/* eslint-disable no-undef */
const firebaseConfig = {
    apiKey: 'AIzaSyBxWcp9x4iueF4VJ8l1xn0EzPfqgIXUW_M',
    authDomain: 'js-news-9a935.firebaseapp.com',
    databaseURL: 'https://js-news-9a935.firebaseio.com',
    projectId: 'js-news-9a935',
    storageBucket: 'js-news-9a935.appspot.com',
    messagingSenderId: '15214305152',
    appId: '1:15214305152:web:bd07ba7f275295d4b46b65',
};

firebase.initializeApp(firebaseConfig);

class FirebaseActions {
    constructor() {
        this.auth = firebase.auth();
    }

    onUserChange(cb) {
        this.auth.onAuthStateChanged((firebaseUser) => cb(firebaseUser));
    }

    signIn(email, pass) {
        this.auth.signInWithEmailAndPassword(email, pass);
    }

    createUser(email, pass) {
        this.auth.createUserWithEmailAndPassword(email, pass);
    }
}

const firebaseActions = new FirebaseActions();

export default firebaseActions;