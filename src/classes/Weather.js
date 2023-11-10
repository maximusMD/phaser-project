import rain from "../assets/particles/rain.png"
import fog from "../assets/particles/fog.png"
import Phaser from "phaser";

export class Weather {
    #enabled = true;
    #rainSpeed;
    // high number = stronger wind
    #windSpeed;
    // low number = high frequency
    #rainFrequency;
    #fogDensity;
    constructor(scene, rainSpeed = 200, windSpeed = 0, rainFrequency = 5, fogDensity = 30) {
        this.scene = scene;
        this.setRainSpeed(rainSpeed);
        this.setWindSpeed(windSpeed);
        this.setRainFrequency(rainFrequency)
        this.setFogDensity(fogDensity)
        scene.load.spritesheet('fog', fog, { frameWidth: 512, frameHeight: 512 })
        scene.load.image('rain', rain)
    }

    setRainSpeed(speed) {
        if (typeof speed === "number") {
            this.#rainSpeed = speed;
        }
    }
    // Pause test

    getRainSpeed() {
        return this.#rainSpeed;
    }

    getEnabled() {
        return this.#enabled;
    }

    disable() {
        this.removeRain();
        this.#enabled = false;
    }

    enable() {
        this.#enabled = true;
    }

    setWindSpeed(speed) {
        if (typeof speed === "number") {
            this.#windSpeed = speed;
        }
    }

    getWindSpeed() {
        return this.#windSpeed;
    }

    setFogDensity(density) {
        this.#fogDensity = density;
    }

    getFogDensity() {
        return this.#fogDensity;
    }

    setRainFrequency(frequency) {
        if (typeof frequency === "number") {
            this.#rainFrequency = frequency;
        }
    }

    getRainFrequency() {
        return this.#rainFrequency;
    }

    addFog() {
        if (this.#enabled) {
            this.scene.fog_foreground = this.scene.add.particles(-10, 150, 'fog', {
                scale: { min: 0.5, max: 1. },
                angle: { min: 0, max: 360, random: true },
                gravityY: 0,
                alpha: { start: 0, end: 1, steps: 5, yoyo: true},
                maxAliveParticles: this.getFogDensity(),
                lifespan: { min: 1000, max: 10000 },
                frequency: 30,
                bounce: 0.05,
                hold: 200,
                speedX: { min: this.getWindSpeed() - 10, max: this.getWindSpeed() },
                speeX: { min: -1, max: 5 },
                follow: this.scene.player,
                blendMode: 'ADD',
            })
            this.scene.fog_background = this.scene.add.particles(-10, 150, 'fog', {
                scale: { min: 0.5, max: 1.5 },
                angle: { min: 0, max: 360 },
                gravityY: 0,
                alpha: { min: 0.05, max: 0.3 },
                maxAliveParticles: this.getFogDensity(),
                lifespan: { min: 5000, max: 10000 },
                frequency: 10,
                bounce: 0.05,
                tint: 0x30373e,
                speedX: { min: 0.2, max: this.getWindSpeed() / 10 },
                speeX: { min: -1, max: 5 },
                follow: this.scene.player,
                blendMode: 'ADD',
            })
            this.scene.fog_background.setDepth(-1)

        }
        if (!this.scene.fog_zone) {
            this.scene.fog_zone = new Phaser.Geom.Rectangle(0, 0, this.scene.cameras.main.displayWidth, this.scene.cameras.main.displayHeight)
            this.scene.fog_zone.centerX = this.scene.player.getBody().x;
            this.scene.fog_zone.centerY = this.scene.player.getBody().y;
        }
        this.scene.fog_foreground.addEmitZone({ type: 'random', source: this.scene.fog_zone, seamless: true })
        this.scene.fog_background.addEmitZone({ type: 'random', source: this.scene.fog_zone, seamless: true })
    }

    removeFog() {
        this.scene.fog_foreground?.destroy()
        this.scene.fog_background?.destroy()
    }

    addRain() {
        if (this.#enabled) {
            this.scene.rain_emitter = this.scene.add.particles(-10, -150, 'rain', {
                scale: 0.1,
                gravityY: 300,
                gravityX: this.getWindSpeed(),
                lifespan: 5000,
                frequency: this.getRainFrequency(),
                maxVelocityX: this.getRainSpeed(),
                maxVelocityY: this.getRainSpeed(),
                blendMode: 'ADD'
            })
            if (!this.scene.rain_zone) {
                this.scene.rain_zone = new Phaser.Geom.Rectangle(0, 0, this.scene.scale.width, 10)
                this.scene.rain_zone.centerX = this.scene.player.getBody().x;
            }

            this.scene.rain_emitter.addEmitZone({ type: 'random', source: this.scene.rain_zone })

        }
    }

    removeRain() {
        if (this.scene.rain_emitter) {
            this.scene.rain_emitter?.destroy();
        }
    }

    pause() {
        this.scene.rain_emitter?.pause()
        this.scene.fog_background?.pause()
        this.scene.fog_foreground?.pause()
    }

    resume() {
        this.scene.rain_emitter?.resume()
        this.scene.fog_background?.resume()
        this.scene.fog_foreground?.resume()
    }

    update() {
        if (this.#enabled = true) {
            if (this.scene.rain_zone) {
                this.scene.rain_zone.centerX = this.scene.player.getBody().x;
            }
        }
        this.scene.fog_foreground.forEachAlive((particle) => {
            console.log(particle.life)
            console.log(particle.lifeCurrent)
            const particleAlphaValue = Math.abs(Math.sin(particle.lifeCurrent / particle.life));
            particle.setAlpha(particleAlphaValue);
        });
    }
}
