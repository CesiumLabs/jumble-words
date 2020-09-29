class JumbleWords {

    constructor() {

        /**
         * Words list
         */
        this.data = require("./words.json");
    }

    /**
     * Add custom words to data
     * @param {string|string[]} WordOrArray Word or array of words
     */
    addWords(WordOrArray) {
        if (typeof WordOrArray === "string") this.data.push(WordOrArray);
        if (Array.isArray(WordOrArray)) this.data = this.data.concat(WordOrArray);
    }

    /**
     * Overwrites existing data and uses provided data
     * @param {string[]} words Words array
     */
    setWords(words) {
        if (!Array.isArray(words)) throw new Error("Words must be array.");
        this.data = words;
    }

    /**
     * Generates random word
     * @param {number} [limit=1] Words limit
     * @param {function} [fn=null] Filter
     */
    generate(limit=1, fn=null) {
        if (!limit || typeof limit !== "number") limit = 1;
        let arr = [];

        for (let i = 0; i < limit; i++) {
            let w = !fn ? this.random() : this.random(1, this.data.filter(fn));
            let s = this.randomize(w[0], true);

            arr.push({
                word: w[0],
                jumble: s === w ? this.randomize(w[0], true) : s
            });
        }

        return arr;
    }

    /**
     * Returns random item from array
     * @param {number} length Length
     * @param {string[]} [arr=null] Custom array
     * @returns {string[]}
     */
    random(length=1, arr=null) {
        if (!length || typeof length !== "number") length = 1;
        const random = Array.isArray(arr) ? this.shuffle(arr) : this.shuffle(this.data);
        return random.slice(0, length);
    }

    /**
     * Randomize word
     * @param {string} word Word
     * @param {boolean} force Forcefully randomize
     */
    randomize(word, force=false) {
        if (!word || typeof word !== "string") throw new Error("Word must be a string!");
        return this.shuffle(word.split(""), !!force).join("");
    }

    /**
     * Shuffles array
     * @param {any[]} array Array to shuffle
     * @param {boolean} [force=false] IF it should force shuffle
     */
    shuffle(array, force=false) {
        if (!Array.isArray(array)) throw new Error("Invalid array!");

        if (!!force) {
            let len = array.length;
            let swap;
            let i;

            while (len > 0) {
                i = Math.floor(Math.random() * len);
                len--;
                swap = array[len];
                array[len] = array[i];
                array[i] = swap;
            }
            return array;
        } else {
            return array.sort(() => 0.5 - Math.random());
        }
    }

    /**
     * Words size
     */
    get size() {
        return this.data.length;
    }

}

module.exports = JumbleWords;