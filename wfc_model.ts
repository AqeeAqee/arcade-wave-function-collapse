namespace WFC {
    // const randomIndice = require('./random-indice');

    export class Model {

        FMX = 0;
        FMY = 0;
        FMXxFMY = 0;
        T = 0;
        N = 0;
        initiliazedField = false;
        generationComplete = false;
        wave: boolean[][] = null;
        compatible: number[][][] = null;
        weightLogWeights: number[] = null;
        sumOfWeights = 0;
        sumOfWeightLogWeights = 0;
        startingEntropy = 0;
        sumsOfOnes: number[] = null;
        sumsOfWeights: number[] = null;
        sumsOfWeightLogWeights: number[] = null;
        entropies: number[] = null;
        propagator: number[][][] = null;
        observed: number[] = null;
        distribution: number[] = null;
        stack: number[][] = null;
        stackSize = 0;
        DX = [-1, 0, 1, 0];
        DY = [0, 1, 0, -1];
        opposite = [2, 3, 0, 1];

        //aqee
        weights: number[] = []

        constructor() { }

        /**
         * @protected
         */
        initialize() {
            this.distribution = [];  //new Array($1)

            this.wave = [];  //new Array($1)
            this.compatible = [];  //new Array($1)

            for (let i = 0; i < this.FMXxFMY; i++) {
                this.wave[i] = [];  //new Array($1)
                this.compatible[i] = [];  //new Array($1)

                for (let t = 0; t < this.T; t++) {
                    this.compatible[i][t] = [0, 0, 0, 0];
                }
            }

            this.weightLogWeights = [];  //new Array($1)
            this.sumOfWeights = 0;
            this.sumOfWeightLogWeights = 0;

            for (let t = 0; t < this.T; t++) {
                this.weightLogWeights[t] = this.weights[t] * Math.log(this.weights[t]);
                this.sumOfWeights += this.weights[t];
                this.sumOfWeightLogWeights += this.weightLogWeights[t];
            }

            this.startingEntropy = Math.log(this.sumOfWeights) - this.sumOfWeightLogWeights / this.sumOfWeights;

            this.sumsOfOnes = [];  //new Array($1)
            this.sumsOfWeights = [];  //new Array($1)
            this.sumsOfWeightLogWeights = [];  //new Array($1)
            this.entropies = [];  //new Array($1)

            this.stack = [];  //new Array($1)
            this.stackSize = 0;
        };

        /**
         *
         * @param {Function} rng Random number generator function
         *
         * @returns {*}
         *
         * @protected
         */
        observe(rng: Function) {

            let min = 1000;
            let argmin = -1;

            for (let i = 0; i < this.FMXxFMY; i++) {
                if (this.onBoundary(i % this.FMX, i / this.FMX | 0)) continue;

                const amount = this.sumsOfOnes[i];

                if (amount === 0) 
                    return false;

                const entropy = this.entropies[i];

                if (amount > 1 && entropy <= min) {
                    const noise = 0.000001 * rng();

                    if (entropy + noise < min) {
                        min = entropy + noise;
                        argmin = i;
                    }
                }
            }
            info.setScore(argmin)
            pause(1)
            if (argmin === -1) {
                this.observed = [];  //new Array($1)

                for (let i = 0; i < this.FMXxFMY; i++) {
                    for (let t = 0; t < this.T; t++) {
                        if (this.wave[i][t]) {
                            this.observed[i] = t;
                            break;
                        }
                    }
                }
                info.setLife(5)
                return true;
            }

            for (let t = 0; t < this.T; t++) {
                this.distribution[t] = this.wave[argmin][t] ? this.weights[t] : 0;
            }
            const r = randomIndice(this.distribution, rng());

            const w = this.wave[argmin];
            for (let t = 0; t < this.T; t++) {
                if (w[t] !== (t === r)) this.ban(argmin, t);
            }

            return null;
        };

        /**
         * @protected
         */
        propagate() {
            while (this.stackSize > 0) {
                const e1 = this.stack[this.stackSize - 1];
                this.stackSize--;

                const i1 = e1[0];
                const x1 = i1 % this.FMX;
                const y1 = i1 / this.FMX | 0;

                for (let d = 0; d < 4; d++) {
                    const dx = this.DX[d];
                    const dy = this.DY[d];

                    let x2 = x1 + dx;
                    let y2 = y1 + dy;

                    if (this.onBoundary(x2, y2)) continue;

                    if (x2 < 0) x2 += this.FMX;
                    else if (x2 >= this.FMX) x2 -= this.FMX;
                    if (y2 < 0) y2 += this.FMY;
                    else if (y2 >= this.FMY) y2 -= this.FMY;

                    const i2 = x2 + y2 * this.FMX;
                    const p = this.propagator[d][e1[1]];
                    const compat = this.compatible[i2];

                    for (let l = 0; l < p.length; l++) {
                        const t2 = p[l];
                        const comp = compat[t2];
                        comp[d]--;
                        if (comp[d] == 0) this.ban(i2, t2);
                    }
                }
            }
        };

        /**
         * Execute a single iteration
         *
         * @param {Function} rng Random number generator function
         *
         * @returns {boolean|null}
         *
         * @protected
         */
        singleIteration(rng: Function) {
            const result = this.observe(rng);

            if (result !== null) {
                this.generationComplete = result;

                return !!result;
            }

            this.propagate();

            return null;
        };

        /**
         * Execute a fixed number of iterations. Stop when the generation is successful or reaches a contradiction.
         *
         * @param {int} [iterations=0] Maximum number of iterations to execute (0 = infinite)
         * @param {Function|null} [rng=Math.random] Random number generator function
         *
         * @returns {boolean} Success
         *
         * @public
         */
        iterate(iterations: number, rng: Function) {
            if (!this.wave) this.initialize();

            if (!this.initiliazedField) {
                this.clear();
            }

            iterations = iterations || 0;
            rng = rng || function () { return Math.random() };

            for (let i = 0; i < iterations || iterations === 0; i++) {
                const result = this.singleIteration(rng);

                if (result !== null) {
                    return !!result;
                }
            }

            return true;
        };

        /**
         * Execute a complete new generation
         *
         * @param {Function|null} [rng=Math.random] Random number generator function
         *
         * @returns {boolean} Success
         *
         * @public
         */
        generate(rng: Function) {
            rng = rng || function () { return Math.random() };

            if (!this.wave) this.initialize();

            this.clear();

            while (true) {
                const result = this.singleIteration(rng);

                if (result !== null) {
                    return !!result;
                }
            }
        };

        /**
         * Check whether the previous generation completed successfully
         *
         * @returns {boolean}
         *
         * @public
         */
        isGenerationComplete() {
            return this.generationComplete;
        };

        /**
         *
         * @param {int} i
         * @param {int} t
         *
         * @protected
         */
        ban(i: number, t: number) {
            const comp = this.compatible[i][t];

            for (let d = 0; d < 4; d++) {
                comp[d] = 0;
            }

            this.wave[i][t] = false;

            this.stack[this.stackSize] = [i, t];
            this.stackSize++;

            this.sumsOfOnes[i] -= 1;
            this.sumsOfWeights[i] -= this.weights[t];
            this.sumsOfWeightLogWeights[i] -= this.weightLogWeights[t];

            const sum = this.sumsOfWeights[i];
            this.entropies[i] = Math.log(sum) - this.sumsOfWeightLogWeights[i] / sum;
        };

        /**
         * Clear the internal state to start a new generation
         *
         * @public
         */
        clear() {
            for (let i = 0; i < this.FMXxFMY; i++) {
                for (let t = 0; t < this.T; t++) {
                    this.wave[i][t] = true;

                    for (let d = 0; d < 4; d++) {
                        this.compatible[i][t][d] = this.propagator[this.opposite[d]][t].length;
                    }
                }

                this.sumsOfOnes[i] = this.weights.length;
                this.sumsOfWeights[i] = this.sumOfWeights;
                this.sumsOfWeightLogWeights[i] = this.sumOfWeightLogWeights;
                this.entropies[i] = this.startingEntropy;
            }

            this.initiliazedField = true;
            this.generationComplete = false;
        };

        //aqee Add
        onBoundary(x: number, y: number) {
            return false
        }
    }
}