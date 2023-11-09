import rain from "../assets/animations/sprites/rain.png"

export class Weather {
    #rainSpeed;
    // high number = stronger wind
    #windSpeed;
    // low number = high frequency
    #rainFrequency;
    constructor(scene, rainSpeed = 200, windSpeed = 0, rainFrequency = 5) {
        this.scene = scene;
        this.setRainSpeed(rainSpeed);
        this.setWindSpeed(windSpeed);
        this.setRainFrequency(rainFrequency)
        scene.load.image('rain', rain)
    }

    setRainSpeed(speed) {
        if (typeof speed === "number") {
            this.#rainSpeed = speed;
        }
    }

    getRainSpeed() {
        return this.#rainSpeed;
    }

    setWindSpeed(speed) {
        if (typeof speed === "number") {
            this.#windSpeed = speed;
        }
    }

    getWindSpeed() {
        return this.#windSpeed;
    }
    setRainFrequency(frequency) {
        if (typeof frequency === "number") {
            this.#rainFrequency = frequency;
        }
    }

    getRainFrequency() {
        return this.#rainFrequency;
    }

    addRain() {
        this.scene.rain_emitter = this.scene.add.particles(-10, -150, 'rain', {
            scale: 0.1,
            gravityY: 300,
            gravityX: this.getWindSpeed(),
            lifespan: 5000,
            frequency: this.getRainFrequency(),
            maxVelocityX: this.getRainSpeed(),
            maxVelocityY: this.getRainSpeed(),
        })
        this.scene.rain_zone = new Phaser.Geom.Rectangle(0,0,this.scene.scale.width,10)
        this.scene.rain_zone.centerX = this.scene.player.getBody().x;
        this.scene.rain_emitter.addEmitZone({type: 'random', source: this.scene.rain_zone})
    }

    update() {
        this.scene.rain_zone.centerX = this.scene.player.getBody().x;
    }
}
