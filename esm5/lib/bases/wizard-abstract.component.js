import { __read, __spread } from "tslib";
import { SparseMultiArrayImpl } from '../utils/sparse-multi-array';
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
        if (!this.disableNextStep) {
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
export { WizardAbstractComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWFic3RyYWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtd2l6YXJkLyIsInNvdXJjZXMiOlsibGliL2Jhc2VzL3dpemFyZC1hYnN0cmFjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBcUIsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUl0RjtJQUFBO0lBaUhBLENBQUM7SUE1Rkcsc0JBQUksZ0RBQVc7UUFEZixZQUFZO2FBQ1o7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVc7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFlO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O01BaUJFO0lBQ0YsbURBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEQsT0FBTztnQkFDSCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixPQUFPLEVBQUUsS0FBSzthQUNqQixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQU8sR0FBUDtRQUFRLGlCQUFvQjthQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7WUFBcEIsNEJBQW9COztRQUV4QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRVMsa0RBQWdCLEdBQTFCOztRQUNJLElBQUksQ0FBQyxTQUFTLFlBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFBLEtBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFDLFVBQVUsb0JBQUksSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixnRUFBZ0U7UUFDaEUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QztRQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFBLEtBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFDLFVBQVUsb0JBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDSSxRQUFRO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNwQzthQUFNO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsMENBQVEsR0FBUjs7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLFlBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFBLEtBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFDLFVBQVUsb0JBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFDLENBQUM7WUFFL0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUEsS0FBQSxJQUFJLENBQUMsWUFBWSxDQUFBLENBQUMsVUFBVSxvQkFBSSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUM7U0FDcEU7SUFDTCxDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLEFBakhELElBaUhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNwYXJzZU11bHRpQXJyYXksIFNwYXJzZU11bHRpQXJyYXlJbXBsIH0gZnJvbSAnLi4vdXRpbHMvc3BhcnNlLW11bHRpLWFycmF5JztcbmltcG9ydCB7IElOYXZFbGVtZW50VHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvbmF2LWVsZW1lbnQtdHlwZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSUhhc1dpemFyZEZlYXR1cmUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2hhcy13aXphcmQtZmVhdHVyZS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2l6YXJkQWJzdHJhY3RDb21wb25lbnQgaW1wbGVtZW50cyBJSGFzV2l6YXJkRmVhdHVyZSB7XG5cbiAgICAvLyBDb250cmFjdFxuICAgIG5hdmlnYXRvckNmZzogSVNwYXJzZU11bHRpQXJyYXk8SU5hdkVsZW1lbnRUeXBlPjtcbiAgICBkaW1JbmRpY2U6IG51bWJlcltdO1xuICAgIGZvcndhcmREaW1JbmRpY2U6IG51bWJlcltdO1xuICAgIHN0ZXBJbmRleDogbnVtYmVyO1xuXG4gICAgLy8gQ29udHJhY3RcbiAgICBuYXZpZ2F0b3I6IElOYXZFbGVtZW50VHlwZTtcbiAgICBmb3J3YXJkTmF2aWdhdG9yOiBJTmF2RWxlbWVudFR5cGU7XG5cbiAgICAvKlxuICAgICAqIE1heGltdW0gZGltZW5zaW9uXG4gICAgICogXG4gICAgICogVGhpcyB2YWx1ZSBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBtYXhpbXVtIHN0ZXBzIGZvciBhbnkgY2hvaWNlLiBcbiAgICAgKiBUaGluayBhYm91dCB0aGlzIG9uZSBhcyB0aGUgaG9yaXpvbnRhbCBheGlzLiBcbiAgICAgKi9cbiAgICBtYXhEaW06IG51bWJlcjtcblxuICAgIC8vIENvbnRyYWN0IFxuICAgIGdldCBoYXNQcmV2U3RlcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcEluZGV4ID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzTmV4dFN0ZXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcndhcmROYXZpZ2F0b3IuaGFzTmV4dFN0ZXA7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVOZXh0U3RlcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZE5hdmlnYXRvci5oYXNOZXh0R3VhcmQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBPdmVycmlkZSB0aGUgbWV0aG9kIGFuZCBjb25kdWN0IHRoZSBmb2xsb3dpbmcgXG4gICAgICpcbiAgICAgKiBcbiAgICAgICAgdGhpcy5uYXZpZ2F0b3JDZmcuc2V0RWxlbWVudCh7XG4gICAgICAgICAgICBoYXNQcmV2U3RlcDogZmFsc2UsXG4gICAgICAgICAgICBoYXNOZXh0U3RlcDogdHJ1ZSxcbiAgICAgICAgICAgIGhhc05leHRHdWFyZDogZmFsc2UsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICAgIH0sIDIpO1xuXG4gICAgICAgIHRoaXMuc3RlcEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5kaW1JbmRpY2UgPSBbMCwgMCwgMCwgMF07XG4gICAgICAgIHRoaXMuZm9yd2FyZERpbUluZGljZSA9IFsxLCAwLCAwLCAwXTtcblxuICAgICAgICB0aGlzLm5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yQ2ZnLmdldEVsZW1lbnQoMSk7XG4gICAgICAgIHRoaXMuZm9yd2FyZE5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yQ2ZnLmdldEVsZW1lbnQoLi4udGhpcy5mb3J3YXJkRGltSW5kaWNlKTtcbiAgICAqL1xuICAgIGJ1aWxkTmF2aWdhdG9yQ2ZnKCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRvckNmZyA9IG5ldyBTcGFyc2VNdWx0aUFycmF5SW1wbCh0aGlzLm1heERpbSwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoYXNQcmV2U3RlcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzTmV4dFN0ZXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhhc05leHRHdWFyZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpc2libGUoLi4ubnVtYmVyczogbnVtYmVyW10pIHtcblxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWF4RGltOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IG51bWJlcnNbaV0gfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZGltSW5kaWNlW2ldO1xuICAgICAgICAgICAgZmxhZyA9IHNvdXJjZSA9PT0gdGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCFmbGFnKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG5leHRTdGVwSW50ZXJuYWwoKSB7XG4gICAgICAgIHRoaXMuZGltSW5kaWNlID0gWy4uLnRoaXMuZm9yd2FyZERpbUluZGljZV07XG4gICAgICAgIHRoaXMubmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCguLi50aGlzLmRpbUluZGljZSk7XG5cbiAgICAgICAgdGhpcy5zdGVwSW5kZXgrKztcbiAgICAgICAgLy8gSWYgdGhlIG5leHQgc3RlcCBpcyBub3QgdGhlIGluaXQgc3RlcCwgbGV0J3MgdXNlIGl0IGRpcmVjdGx5LlxuICAgICAgICBpZiAodGhpcy5mb3J3YXJkRGltSW5kaWNlW3RoaXMuc3RlcEluZGV4XSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkRGltSW5kaWNlW3RoaXMuc3RlcEluZGV4XSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcndhcmROYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvckNmZy5nZXRFbGVtZW50KC4uLnRoaXMuZm9yd2FyZERpbUluZGljZSk7XG4gICAgfVxuXG4gICAgbmV4dFN0ZXAoKSB7XG4gICAgICAgIC8vIEd1YXJkXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlTmV4dFN0ZXApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvcndhcmROYXZpZ2F0b3IubmV4dFN0ZXApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZE5hdmlnYXRvci5uZXh0U3RlcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXh0U3RlcEludGVybmFsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2U3RlcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RlcEluZGV4ID4gMCkge1xuICAgICAgICAgICAgLy8gUmVjb3ZlciBvdXIgb3B0aW9ucyBcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZERpbUluZGljZSA9IFsuLi50aGlzLmRpbUluZGljZV07XG4gICAgICAgICAgICB0aGlzLmZvcndhcmROYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvckNmZy5nZXRFbGVtZW50KC4uLnRoaXMuZm9yd2FyZERpbUluZGljZSk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RlcEluZGV4LS07XG4gICAgICAgICAgICB0aGlzLmRpbUluZGljZVt0aGlzLnN0ZXBJbmRleF0gPSAwO1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvckNmZy5nZXRFbGVtZW50KC4uLnRoaXMuZGltSW5kaWNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==