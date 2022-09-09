import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging.js";

let butty=document.querySelector("button")
butty.addEventListener("click", subby)
async function subby() {
	let registration=await navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope')
	if (registration) {registration.unregister();}
	this.disabled=true;
	if (navigator.language==='ja') {
		butty.innerHTML='購読しています…'
	} else {
		butty.innerHTML='Subscribing...'
	}
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
	const regis=await navigator.serviceWorker.register('/firebase-messaging-sw.js')
	getToken(messaging, { vapidKey: 'BBObvpZmk4P2_HY84Sk6w6aGQM_TKT9L45FdnNs9nRBh3xkrFwsduyOMlFzFti1qXySLNlOQRNgwatxRpjnfctI' , serviceWorkerRegistration:regis }).then((currentToken) => {
	  if (currentToken) {
		console.log(currentToken)
		if (navigator.language==='ja') {
			butty.innerHTML='購読しました'
		} else {
			butty.innerHTML='Subscribed'
		}
	  } else {
		// Show permission request UI
		console.log('No registration token available. Request permission to generate one.');
		// ...
	  }
	}).catch((err) => {
	  console.log('An error occurred while retrieving token. ', err);
	  this.disabled=false;
	  if (navigator.language==='ja') {
	　　	butty.innerHTML='誤りでした'
	　　} else {
	　　	butty.innerHTML='Error'
	　　}
	});
}