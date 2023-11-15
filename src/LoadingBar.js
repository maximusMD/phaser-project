export function LoadingBar(scene, alt = false) {

    scene.anims.create({
        key: 'rogue_loading',
        frames: scene.anims.generateFrameNames('rogue_load', {
            prefix: 'rogue_player_run-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 10,
        repeat: 0,
    });
    scene.anims.create({
        key: 'alt_loading',
        frames: scene.anims.generateFrameNames('alt_load', {
            prefix: 'waifu_idle-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 10,
        repeat: 0,
    });

    var screen_width = scene.scale.width
    var screen_height = scene.scale.height

    var randomTips = [
        "Try dashing through attacks to avoid damage!",
    ]
    var progressBar = scene.add.graphics();
    var progressBox = scene.add.graphics();
    var progressBarBorder = scene.add.graphics();

    var loadingText = scene.make.text({
        x: (screen_width / 2),
        y: screen_height / 2 + 25,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    const randomIndex = Math.floor((Math.random() * randomTips.length));
    var tipText = scene.make.text({
        x: (screen_width / 2),
        y: screen_height / 2 + 80,
        text: randomTips[randomIndex],
        style: {
            font: '12px monospace',
            fill: '#ffffff'
        }
    })
    tipText.setOrigin(0.5, 0.5);
    loadingText.setOrigin(0.5, 0.5);

    progressBarBorder.lineStyle(3, 0xffffff, 0.8)
    progressBarBorder.strokeRect((screen_width / 2) - (320 / 2), screen_height / 2 - (50 / 2), 320, 25)
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect((screen_width / 2) - (320 / 2), screen_height / 2 - (50 / 2), 320, 25);

    if (alt) {
        const loadingSprite = scene.add.sprite(screen_width / 2, screen_height / 2 - 60, "alt_load")
        loadingSprite.anims.play("alt_loading")
        loadingSprite.setScale(0.5);
    } else {
        const loadingSprite = scene.add.sprite(screen_width / 2, screen_height / 2 - 50, "rogue_load")
        loadingSprite.anims.play("rogue_loading")
    }

    scene.load.on('progress', function (value) {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(
            (screen_width / 2) - (320 / 2),
            screen_height / 2 - (50 / 2),
            300 * value,
            25);
    });

    scene.load.on('fileprogress', function (file) {
        // File names if needed
    });
    scene.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        progressBarBorder.destroy();
        tipText.destroy();
        loadingText.destroy();
        loadingSprite.destroy();
    });
}