import rain from "../assets/particles/rain.png"
import fog from "../assets/particles/fog.png"
import Phaser from "phaser";

export class Weather {
    #enabled = true;
    #rainEnabled = false;
    #fogEnabled = false;
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
    init() {
        this.scene.fog_foreground = this.scene.add.particles(-10, 150, 'fog', {
            scale: { min: 0.5, max: 1. },
            angle: { min: 0, max: 360, random: true },
            gravityY: 0,
            alpha: {
                start: 0,
                end: 0.7,
                ease: (t) => 0.5 * Phaser.Math.Easing.Cubic.InOut(t > 0.5 ? 2 - 2 * t : 2 * t)
            },
            maxAliveParticles: this.getFogDensity(),
            lifespan: { min: 1000, max: 10000 },
            frequency: 30,
            bounce: 0.05,
            hold: 200,
            speedX: { min: this.getWindSpeed() - 10, max: this.getWindSpeed() },
            speeX: { min: -1, max: 5 },
            follow: this.scene.player,
            blendMode: 'LUMINOSITY',
        })
        this.scene.fog_background = this.scene.add.particles(-10, 150, 'fog', {
            scale: { min: 0.3, max: 1.5 },
            angle: { min: 0, max: 360 },
            gravityY: 0,
            alpha: {
                start: 0.1,
                end: 0.5,
                ease: (t) => 0.5 * Phaser.Math.Easing.Cubic.InOut(t > 0.5 ? 2 - 2 * t : 2 * t)
            },
            maxAliveParticles: this.getFogDensity() * 3,
            lifespan: { min: 5000, max: 10000 },
            frequency: 10,
            bounce: 0.05,
            tint: 0x30373e,
            speedX: { min: -10, max: this.getWindSpeed() / 10 },
            follow: this.scene.player,
            blendMode: 'DARKEN',
        })
        this.scene.rain_foreground = this.scene.add.particles(-10, -150, 'rain', {
            scale: 0.1,
            gravityY: 300,
            gravityX: this.getWindSpeed(),
            lifespan: 5000,
            frequency: this.getRainFrequency(),
            maxVelocityX: this.getRainSpeed(),
            maxVelocityY: this.getRainSpeed(),
            blendMode: 'LIGHTEN'
        })
        this.scene.rain_background = this.scene.add.particles(-10, -150, 'rain', {
            scale: 0.1,
            gravityY: 200,
            gravityX: this.getWindSpeed(),
            lifespan: 5000,
            frequency: this.getRainFrequency(),
            maxVelocityX: this.getRainSpeed(),
            maxVelocityY: this.getRainSpeed(),
            alpha: 0.8,
        })
        this.scene.rain_background.setDepth(-2)
        if (!this.scene.rain_zone) {
            this.scene.rain_zone = new Phaser.Geom.Rectangle(0, 0, this.scene.scale.width, 10)
            this.scene.rain_zone.centerX = this.scene.player.getBody().x;
        }

        this.scene.rain_foreground?.addEmitZone({ type: 'random', source: this.scene.rain_zone, seamless: true })
        this.scene.rain_background?.addEmitZone({ type: 'random', source: this.scene.rain_zone, seamless: true })

        this.scene.fog_background.setDepth(-2)
        this.scene.fog_zone = new Phaser.Geom.Rectangle(0, 0, this.scene.cameras.main.displayWidth, this.scene.cameras.main.displayHeight)
        this.scene.fog_zone.centerX = this.scene.player.getBody().x;
        this.scene.fog_zone.centerY = this.scene.player.getBody().y;
        this.scene.fog_foreground?.addEmitZone({ type: 'random', source: this.scene.fog_zone, seamless: true })
        this.scene.fog_background?.addEmitZone({ type: 'random', source: this.scene.fog_zone, seamless: true })
        
        this.scene.rain_background.stop()
        this.scene.rain_foreground.stop()
        this.scene.fog_background.stop()
        this.scene.fog_foreground.stop()
    }

    setRainSpeed(speed) {
        if (typeof speed === "number") {
            this.#rainSpeed = speed;
        }
    }
    // Pause test
    getFogEnabled() {
        return this.#fogEnabled;
    }
    getRainEnabled() {
        return this.#rainEnabled;
    }
    setFogEnabled(bool) {
        this.#fogEnabled = bool;
    }
    setRainEnabled(bool) {
        this.#rainEnabled = bool;
    }
    getRainSpeed() {
        return this.#rainSpeed;
    }

    getEnabled() {
        return this.#enabled;
    }

    disable() {
        this.removeRain(true);
        this.removeFog(true);
        this.#enabled = false;
    }

    enable() {
        this.#enabled = true;
        if (this.getFogEnabled()) this.addFog();
        if (this.getRainEnabled()) this.addRain();
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
        this.setFogEnabled(true);
        this.scene.fog_foreground.start()
        this.scene.fog_background.start()
    }

    removeFog(weather_disable) {
        if (!weather_disable) this.setFogEnabled(false);
        this.scene.fog_foreground.stop()
        this.scene.fog_background.stop()
    }

    addRain() {
        this.setRainEnabled(true);
        this.scene.rain_foreground.start();
        this.scene.rain_background.start();
    }

    removeRain(weather_disable) {
        if (!weather_disable) this.setRainEnabled(false);
        this.scene.rain_foreground?.stop?.();
        this.scene.rain_background?.stop?.();
    }

    pause() {
        this.scene.rain_foreground?.pause()
        this.scene.rain_background?.pause()
        this.scene.fog_background?.pause()
        this.scene.fog_foreground?.pause()
    }

    resume() {
        this.scene.rain_background?.resume()
        this.scene.rain_foreground?.resume()
        this.scene.fog_background?.resume()
        this.scene.fog_foreground?.resume()
    }

    update() {
        if (this.#enabled = true) {
            if (this.scene.rain_zone) {
                this.scene.rain_zone.centerX = this.scene.player.getBody().x;
            }
        }
    }
}
