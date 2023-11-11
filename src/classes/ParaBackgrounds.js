export class ParaBackgrounds  {
    #scene
    #backgrounds

    constructor(scene, background_images) {
        this.setScene(scene);
        this.#backgrounds = [];
        for (const background of background_images) {
            this.getScene().load.image(background.key, background.image)
        }
    }
    setScene(scene) {
        this.#scene = scene;
    }
    getScene() {
        return this.#scene;
    }
    getBackgrounds() {
        return this.#backgrounds;
    }
    addBackground(obj) {
        this.#backgrounds.push(obj);
    }
    update() {
        for (const background of this.getBackgrounds()) {
            background.sprite.tilePositionX = background.sprite.tilePositionX = this.getScene().cameras.main.scrollX * background.ratioX;
        }
    }
}