self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('push', function(e){
	console.log('received')
	e.waitUntil(clients.matchAll({includeUncontrolled: true}).then(function(clients){
		if (clients.length === 0) {
			console.log('no clients')
			showthenotification(e)
		} else {
			let vis=false;
			for (let i=0, l=clients.length; i<l; i++) {
				if (clients[i].visibilityState==='visible') {
					console.log('visible client found')
					vis=true;
					break;
				}
			}
			if (vis===false) {
				console.log('no visible clients found')
				showthenotification(e)
			}
		}
	}))
})

self.addEventListener('notificationclick', function(event){
	console.log(event)
	console.log(event.notification.data)
	event.waitUntil(clients.matchAll().then(function(clents){
		console.log(clents)
		console.log(clents.length)
		if (clents.length > 0) {
			clents[0].navigate(event.notification.data)
		} else {
			self.clients.openWindow(event.notification.data)
		}
		event.notification.close()
	}))
})

function showthenotification(e, clent){
	let message = e.data.json()		
	let myicon='https://thysbelon.github.io/thysbelonicon.svg'
	switch(message.notification.body.split('|||')[0]) {
		case 'jponly':
			if (navigator.language === 'ja-JP') {
				self.registration.showNotification(message.notification.title, {body:'ここにクリックで新しい投稿を表示する。', icon:myicon, data:message.notification.body.split('|||')[1]})
			}
			break;
		case 'enonly':
			if (navigator.language !== 'ja-JP') {
				self.registration.showNotification(message.notification.title, {body:'Click here to view new post.', icon:myicon, data:message.notification.body.split('|||')[1]})
			}
			break;
		case 'enjp':
			if (navigator.language === 'ja-JP') {
				self.registration.showNotification(message.notification.title.split('|||')[1], {body:'ここにクリックで新しい投稿を表示する。', icon:myicon, data:message.notification.body.split('|||')[2]})
			} else {
				self.registration.showNotification(message.notification.title.split('|||')[0], {body:'Click here to view new post.', icon:myicon, data:message.notification.body.split('|||')[1]})
			}
	}
}