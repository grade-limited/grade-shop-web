if ("undefined" === typeof window) {
	// Scripts for firebase and firebase messaging
	importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
	importScripts(
		"https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js"
	);

	// Initialize the Firebase app in the service worker by passing the generated config
	const firebaseConfig = {
		apiKey: "AIzaSyA_jGFZtlxQ8BzJ0jgpDndQEMK2sAl5P5E",
		authDomain: "reserveit-bd.firebaseapp.com",
		projectId: "reserveit-bd",
		storageBucket: "reserveit-bd.appspot.com",
		messagingSenderId: "572972665569",
		appId: "1:572972665569:web:6194145a056b9d159045a0",
		measurementId: "G-8734KHWTV5",
	};

	// Initialization of the application
	firebase.initializeApp(firebaseConfig);

	// Retrieve firebase messaging
	const messaging = firebase.messaging();

	// Background message listener
	messaging.onBackgroundMessage(function (payload) {
		// Customize notification here
		const notificationTitle = payload.notification.title;
		const notificationOptions = {
			body: payload.notification.body,
			icon: "/favicon.svg",
		};

		self.registration.showNotification(notificationTitle, notificationOptions);
	});
}
