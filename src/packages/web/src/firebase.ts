import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDASa9gfqb6dYJwLrUGJFjM6WXJO2wwAQk',
  authDomain: 'ti1-final-leap.firebaseapp.com',
  projectId: 'ti1-final-leap',
  storageBucket: 'ti1-final-leap.appspot.com',
  messagingSenderId: '206385707149',
  appId: '1:206385707149:web:ecb93d89797bcf95b68ac4'
};

const firebaseAPI = firebase.initializeApp(config);

export const firbaseAnalytic = firebaseAPI.analytics();

let messaging: any = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

const key =
  'BFwqSqHJciMUpSZqdknNkuWp9Wn51ZFKGZBiBaB1yZDVO4O85nsNJMI7bt30v-eeXDRGFcorXXE3txd-xcWRguc';

export const getFirebaseToken = async () => {
  try {
    const res = await messaging.getToken({
      vapidKey: key
    });
    return res;
  } catch (e) {
    console.log(e);
    return '';
  }
};

export default firebase;
