if ("serviceWorker" in navigator) {
	navigator.serviceWorker.getRegistrations().then(function (registrations) {
		for (var i = 0; i < registrations.length; i++) {
			if (
				registrations[i].active.scriptURL === "https://reserveitbd.com/sw.js"
			) {
				registrations[i].unregister();
			}
		}
	});
}
