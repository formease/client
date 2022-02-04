import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";

function FirebaseInit() {
	return new Promise((res, rej) => {
		const config = {
            apiKey: "AIzaSyCtLctmVtf5LgHJv2y4h5eVx3h6DsM4KRY",
            authDomain: "forms-server.firebaseapp.com",       
            projectId: "forms-server",
            storageBucket: "forms-server.appspot.com",
            messagingSenderId: "265562888456",
            appId: "1:265562888456:web:0ad6cfe8a44ef7af7234bd",
		};

		const app = initializeApp(config);
		console.info('init done');
		res();
	});
}

(async () => {
await FirebaseInit()
})()