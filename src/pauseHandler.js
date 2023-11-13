export function handlePause(scene, music) {
	let isPaused = false;
	const characters = scene.allSprites;
	const weather = scene.weather;

	function pause() {
		if (!isPaused) {
			scene.physics.pause();
			characters.forEach((character) => {
				character.setActive(false);
			});
			weather.pause();
			isPaused = true;
			showPauseMenu();
		}
	}

	function resume() {
		if (isPaused) {
			scene.physics.resume();
			characters.forEach((character) => {
				character.setActive(true);
			});
			weather.resume();
			isPaused = false;
			hidePauseMenu();
		}
	}

	function showPauseMenu() {
		if (!scene.scene.isActive('PauseMenuScene')) {
			scene.scene.launch('PauseMenuScene', {
				music,
				weather,
			});
		}
	}

	function hidePauseMenu() {
		if (scene.scene.isActive('PauseMenuScene')) {
			scene.scene.stop('PauseMenuScene');
		}
	}

	scene.input.keyboard.on('keydown-P', () => {
		togglePause();
	});

	function togglePause() {
		if (isPaused) {
			resume();
		} else {
			pause();
		}
	}

	return {
		togglePause,
	};
}
