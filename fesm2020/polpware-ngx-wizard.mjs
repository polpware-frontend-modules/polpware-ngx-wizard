class SparseMultiArrayImpl {
    constructor(maxDim, ctor) {
        this._impl = [];
        this._maxDim = maxDim;
        this._factory = ctor;
    }
    getElement(...numbers) {
        const len = this._maxDim > numbers.length ? this._maxDim : numbers.length;
        let data = this._impl;
        for (let i = 0; i < len; i++) {
            const dimIndex = numbers[i] || 0;
            if (data[dimIndex]) {
                data = data[dimIndex];
            }
            else {
                return this._factory();
            }
        }
        return data;
    }
    setElement(val, ...numbers) {
        const len = this._maxDim > numbers.length ? this._maxDim : numbers.length;
        let data = this._impl;
        for (let i = 0; i < len - 1; i++) {
            const dimIndex = numbers[i] || 0;
            if (!data[dimIndex]) {
                data[dimIndex] = [];
            }
            data = data[dimIndex];
        }
        // Unroll the last one
        const lastIndex = numbers[len - 1] || 0;
        data[lastIndex] = val;
    }
}

class WizardAbstractComponent {
    // Contract 
    get hasPrevStep() {
        return this.stepIndex > 0;
    }
    get hasNextStep() {
        return this.forwardNavigator.hasNextStep;
    }
    get disableNextStep() {
        return this.forwardNavigator.hasNextGuard;
    }
    /*
     * Override the method and conduct the following
     *
     *
        this.navigatorCfg.setElement({
            hasPrevStep: false,
            hasNextStep: true,
            hasNextGuard: false,
            visible: true
        }, 2);

        this.stepIndex = 0;
        this.dimIndice = [0, 0, 0, 0];
        this.forwardDimIndice = [1, 0, 0, 0];

        this.navigator = this.navigatorCfg.getElement(1);
        this.forwardNavigator = this.navigatorCfg.getElement(...this.forwardDimIndice);
    */
    buildNavigatorCfg() {
        this.navigatorCfg = new SparseMultiArrayImpl(this.maxDim, () => {
            return {
                hasPrevStep: false,
                hasNextStep: false,
                hasNextGuard: false,
                visible: false
            };
        });
    }
    visible(...numbers) {
        let flag = false;
        for (let i = 0; i < this.maxDim; i++) {
            const source = numbers[i] || 0;
            const target = this.dimIndice[i];
            flag = source === target;
            if (!flag) {
                break;
            }
        }
        return flag;
    }
    nextStepInternal() {
        this.dimIndice = [...this.forwardDimIndice];
        this.navigator = this.navigatorCfg.getElement(...this.dimIndice);
        this.stepIndex++;
        // If the next step is not the init step, let's use it directly.
        if (this.forwardDimIndice[this.stepIndex] === 0) {
            this.forwardDimIndice[this.stepIndex] = 1;
        }
        this.forwardNavigator = this.navigatorCfg.getElement(...this.forwardDimIndice);
    }
    nextStep() {
        // Guard
        if (this.disableNextStep) {
            return;
        }
        if (this.forwardNavigator.nextStep) {
            this.forwardNavigator.nextStep();
        }
        else {
            this.nextStepInternal();
        }
    }
    prevStep() {
        if (this.forwardNavigator.prevStep) {
            this.forwardNavigator.prevStep();
        }
        else {
            this.prevStepInternal();
        }
    }
    prevStepInternal() {
        if (this.stepIndex > 0) {
            // Recover our options 
            this.forwardDimIndice = [...this.dimIndice];
            this.forwardNavigator = this.navigatorCfg.getElement(...this.forwardDimIndice);
            this.stepIndex--;
            this.dimIndice[this.stepIndex] = 0;
            this.navigator = this.navigatorCfg.getElement(...this.dimIndice);
        }
    }
}

/*
 * Public API Surface of ngx-wizard
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SparseMultiArrayImpl, WizardAbstractComponent };
//# sourceMappingURL=polpware-ngx-wizard.mjs.map
