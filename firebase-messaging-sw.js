// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
//importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
//importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
/*firebase.initializeApp({
  apiKey: "AIzaSyDJ0COCb3j22bfOlEnvsNbOBiyJFGkPZvU",
  authDomain: "thysbelon.firebaseapp.com",
  projectId: "thysbelon",
  storageBucket: "thysbelon.appspot.com",
  messagingSenderId: "36759748418",
  appId: "1:36759748418:web:e98456694f8a95570512db"
});*/

self.addEventListener('push', async function(e){
	console.log('received')
	let allClients = await clients.matchAll({
	  includeUncontrolled: true
	})
	console.log(allClients.length)
	if (allClients.length === 0) {
		let message1 = e.data
		let message = message1.json()		
		let myicon='https://thysbelon.github.io/thysbelonicon.svg'
		switch(message.notification.body.split('|||')[0]) {
			case 'jponly':
				if (navigator.language === 'ja-JP') {
					self.addEventListener('notificationclick', function(event){self.clients.openWindow(message.notification.body.split('|||')[1])}, {once:true})
					self.registration.showNotification(message.notification.title, {body:'ここにクリックで新しい投稿を表示する。', icon:myicon/*, onclick:''*/})
				}
				break;
			case 'enonly':
				if (navigator.language !== 'ja-JP') {
					self.addEventListener('notificationclick', function(event){self.clients.openWindow(message.notification.body.split('|||')[1])}, {once:true})
					self.registration.showNotification(message.notification.title, {body:'Click here to view new post.', icon:myicon})
				}
				break;
			case 'enjp':
				if (navigator.language === 'ja-JP') {
					self.addEventListener('notificationclick', function(event){self.clients.openWindow(message.notification.body.split('|||')[2])}, {once:true})
					let title=message.notification.title.split('|||')[1]
					self.registration.showNotification(title, {body:'ここにクリックで新しい投稿を表示する。', icon:myicon})
				} else {
					self.addEventListener('notificationclick', function(event){self.clients.openWindow(message.notification.body.split('|||')[1])}, {once:true})
					let title=message.notification.title.split('|||')[0]
					self.registration.showNotification(title, {body:'Click here to view new post.', icon:myicon})
				}
		}
	}
})