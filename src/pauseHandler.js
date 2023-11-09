export function handlePause(scene, characters) {
	let isPaused = false;
    

	function pause() {
		scene.physics.pause();
		characters.forEach((actor) => {
			actor.setActive(false);
		});

		isPaused = true;
	}

	function resume() {
		scene.physics.resume();
		characters.forEach((actor) => {
			actor.setActive(true);
		});

		isPaused = false;
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
