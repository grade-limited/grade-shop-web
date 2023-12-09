import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Insert firebase config that you got from Firebase console after creating app
const firebaseConfig = {
	apiKey: "AIzaSyA_jGFZtlxQ8BzJ0jgpDndQEMK2sAl5P5E",
	authDomain: "reserveit-bd.firebaseapp.com",
	projectId: "reserveit-bd",
	storageBucket: "reserveit-bd.appspot.com",
	messagingSenderId: "572972665569",
	appId: "1:572972665569:web:6194145a056b9d159045a0",
	measurementId: "G-8734KHWTV5",
};

const app = initializeApp(firebaseConfig);
const messaging: any =
	"undefined" !== typeof navigator
		? getMessaging("undefined" !== typeof window ? app : undefined)
		: undefined;

export const requestToken = async () => {
	return getToken(messaging, {
		vapidKey:
			"BFVaTV938N-1m-m75UCUhdpVNh04kMFKxU68ljPIptnQLHGJCM5BkeuIYkzW0tqELpRx7huxVai83NNiCkJHHLA",
	}).catch((err) => {
		console.log("An error occurred while retrieving token. ", err);
	});
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
