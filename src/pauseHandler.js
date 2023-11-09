export function handlePause(scene, characters) {
	let isPaused = false;

	function pause() {
		scene.physics.pause();
		characters.forEach((actor) => {
			actor.setActive(false);
		});

		isPaused = true;
		showPauseMenu();
	}

	function resume() {
		scene.physics.resume();
		characters.forEach((actor) => {
			actor.setActive(true);
		});

		isPaused = false;
		hidePauseMenu();
	}

	function showPauseMenu() {
		if (!scene.scene.isActive('PauseMenuScene')) {
			scene.scene.run('PauseMenuScene');
		}
	}

	function hidePauseMenu() {
		if (scene.scene.isActive('PauseMenuScene')) {
			scene.scene.stop('PauseMenuScene');
		}
	}

	scene.input.keyboard.on('keydown-ESC', () => {
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
