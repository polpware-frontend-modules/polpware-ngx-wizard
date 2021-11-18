import { __spread } from 'tslib';

var SparseMultiArrayImpl = /** @class */ (function () {
    function SparseMultiArrayImpl(maxDim, ctor) {
        this._impl = [];
        this._maxDim = maxDim;
        this._factory = ctor;
    }
    SparseMultiArrayImpl.prototype.getElement = function () {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
        var len = this._maxDim > numbers.length ? this._maxDim : numbers.length;
        var data = this._impl;
        for (var i = 0; i < len; i++) {
            var dimIndex = numbers[i] || 0;
            if (data[dimIndex]) {
                data = data[dimIndex];
            }
            else {
                return this._factory();
            }
        }
        return data;
    };
    SparseMultiArrayImpl.prototype.setElement = function (val) {
        var numbers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            numbers[_i - 1] = arguments[_i];
        }
        var len = this._maxDim > numbers.length ? this._maxDim : numbers.length;
        var data = this._impl;
        for (var i = 0; i < len - 1; i++) {
            var dimIndex = numbers[i] || 0;
            if (!data[dimIndex]) {
                data[dimIndex] = [];
            }
            data = data[dimIndex];
        }
        // Unroll the last one
        var lastIndex = numbers[len - 1] || 0;
        data[lastIndex] = val;
    };
    return SparseMultiArrayImpl;
}());

var WizardAbstractComponent = /** @class */ (function () {
    function WizardAbstractComponent() {
    }
    Object.defineProperty(WizardAbstractComponent.prototype, "hasPrevStep", {
        // Contract 
        get: function () {
            return this.stepIndex > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardAbstractComponent.prototype, "hasNextStep", {
        get: function () {
            return this.forwardNavigator.hasNextStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardAbstractComponent.prototype, "disableNextStep", {
        get: function () {
            return this.forwardNavigator.hasNextGuard;
        },
        enumerable: true,
        configurable: true
    });
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
    WizardAbstractComponent.prototype.buildNavigatorCfg = function () {
        this.navigatorCfg = new SparseMultiArrayImpl(this.maxDim, function () {
            return {
                hasPrevStep: false,
                hasNextStep: false,
                hasNextGuard: false,
                visible: false
            };
        });
    };
    WizardAbstractComponent.prototype.visible = function () {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
        var flag = false;
        for (var i = 0; i < this.maxDim; i++) {
            var source = numbers[i] || 0;
            var target = this.dimIndice[i];
            flag = source === target;
            if (!flag) {
                break;
            }
        }
        return flag;
    };
    WizardAbstractComponent.prototype.nextStepInternal = function () {
        var _a, _b;
        this.dimIndice = __spread(this.forwardDimIndice);
        this.navigator = (_a = this.navigatorCfg).getElement.apply(_a, __spread(this.dimIndice));
        this.stepIndex++;
        // If the next step is not the init step, let's use it directly.
        if (this.forwardDimIndice[this.stepIndex] === 0) {
            this.forwardDimIndice[this.stepIndex] = 1;
        }
        this.forwardNavigator = (_b = this.navigatorCfg).getElement.apply(_b, __spread(this.forwardDimIndice));
    };
    WizardAbstractComponent.prototype.nextStep = function () {
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
    };
    WizardAbstractComponent.prototype.prevStep = function () {
        if (this.forwardNavigator.prevStep) {
            this.forwardNavigator.prevStep();
        }
        else {
            this.prevStepInternal();
        }
    };
    WizardAbstractComponent.prototype.prevStepInternal = function () {
        var _a, _b;
        if (this.stepIndex > 0) {
            // Recover our options 
            this.forwardDimIndice = __spread(this.dimIndice);
            this.forwardNavigator = (_a = this.navigatorCfg).getElement.apply(_a, __spread(this.forwardDimIndice));
            this.stepIndex--;
            this.dimIndice[this.stepIndex] = 0;
            this.navigator = (_b = this.navigatorCfg).getElement.apply(_b, __spread(this.dimIndice));
        }
    };
    return WizardAbstractComponent;
}());

/*
 * Public API Surface of ngx-wizard
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SparseMultiArrayImpl, WizardAbstractComponent };
//# sourceMappingURL=polpware-ngx-wizard.js.map
