export default class Tial{
    #x;
    #y;
    #tileElement;
    #value;
    constructor(gridElement, value = Math.random() > 0.5 ? 4 : 2){
        this.#tileElement = document.createElement('div');
        this.#tileElement.classList.add('tile');
        gridElement.append(this.#tileElement);
        this.value = value;
    }

    get value(){
        return this.#value;
    }

    set value(v){
        this.#value = v;
        this.#tileElement.textContent = v;
        const power = Math.log2(v);
        const backgroundLightness = 100 - power * 9;
        this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
    }

    set x(value){
        this.#x = value;
        this.#tileElement.style.setProperty("--x", value);
    }

    set y(value){
        this.#y = value;
        this.#tileElement.style.setProperty("--y", value);
    }

    remove(){
        this.#tileElement.remove();
    }

    waitForTransition(){
        return Promise.resolve( resolve => {
            this.#tileElement.addEventListener('transitionend', resolve, {once: true})
        })
    }
}