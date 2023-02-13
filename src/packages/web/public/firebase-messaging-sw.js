// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const config = {
  apiKey: 'AIzaSyDASa9gfqb6dYJwLrUGJFjM6WXJO2wwAQk',
  authDomain: 'ti1-final-leap.firebaseapp.com',
  projectId: 'ti1-final-leap',
  storageBucket: 'ti1-final-leap.appspot.com',
  messagingSenderId: '206385707149',
  appId: '1:206385707149:web:ecb93d89797bcf95b68ac4'
};

firebase.initializeApp(config);

// Retrieve firebase messaging
const messaging = firebase.messaging();
