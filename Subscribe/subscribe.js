import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJ0COCb3j22bfOlEnvsNbOBiyJFGkPZvU",
  authDomain: "thysbelon.firebaseapp.com",
  projectId: "thysbelon",
  storageBucket: "thysbelon.appspot.com",
  messagingSenderId: "36759748418",
  appId: "1:36759748418:web:e98456694f8a95570512db"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

document.querySelector("button").addEventListener("click", subby)
function subby() {
	this.disabled=true;
	getToken(messaging, { vapidKey: 'BBObvpZmk4P2_HY84Sk6w6aGQM_TKT9L45FdnNs9nRBh3xkrFwsduyOMlFzFti1qXySLNlOQRNgwatxRpjnfctI' }).then((currentToken) => {
	  if (currentToken) {
		// Send the token to your server and update the UI if necessary
		console.log(currentToken)
		// ...
		console.log('bopis');
	  } else {
		// Show permission request UI
		console.log('No registration token available. Request permission to generate one.');
		// ...
	  }
	}).catch((err) => {
	  console.log('An error occurred while retrieving token. ', err);
	  this.disabled=false;
	  // ...
	});
}

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
import { onMessage } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging.js";

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});