var PLAYER_ID = null;

function getParameterByName(name) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	var results = regex.exec(window.location.search);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function readUrlParams() {
	PLAYER_ID = getParameterByName("playerId");
	console.log({ PLAYER_ID });
	if (PLAYER_ID) return true;
	return false;
}

function sendResult(score, level, timePlayed) {
	const currentDate = new Date();
	const gameStats = {
		playerId: PLAYER_ID,
		score: score,
		level: level,
		timePlayed: timePlayed,
		date: currentDate.toISOString(),
	};
	console.log("Juego finalizado", gameStats);
	fetch("http://34.28.220.88:8000/tournaments/game-over", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(gameStats),
	})
		.then((response) => response.json())
		.then((data) => console.log({data}))
		.catch((error) => console.error({error}));
}
