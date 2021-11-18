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
export { WizardAbstractComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWFic3RyYWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtd2l6YXJkLyIsInNvdXJjZXMiOlsibGliL2Jhc2VzL3dpemFyZC1hYnN0cmFjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBcUIsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUl0RjtJQUFBO0lBMEhBLENBQUM7SUFyR0csc0JBQUksZ0RBQVc7UUFEZixZQUFZO2FBQ1o7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVc7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFlO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O01BaUJFO0lBQ0YsbURBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEQsT0FBTztnQkFDSCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixPQUFPLEVBQUUsS0FBSzthQUNqQixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQU8sR0FBUDtRQUFRLGlCQUFvQjthQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7WUFBcEIsNEJBQW9COztRQUV4QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRVMsa0RBQWdCLEdBQTFCOztRQUNJLElBQUksQ0FBQyxTQUFTLFlBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFBLEtBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFDLFVBQVUsb0JBQUksSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixnRUFBZ0U7UUFDaEUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QztRQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFBLEtBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFDLFVBQVUsb0JBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDSSxRQUFRO1FBQ1IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEM7YUFBTTtZQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3BDO2FBQU07WUFDSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFUyxrREFBZ0IsR0FBMUI7O1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNwQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixZQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQSxLQUFBLElBQUksQ0FBQyxZQUFZLENBQUEsQ0FBQyxVQUFVLG9CQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBQyxDQUFDO1lBRS9FLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFBLEtBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFDLFVBQVUsb0JBQUksSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDO1NBQ3BFO0lBQ0wsQ0FBQztJQUNMLDhCQUFDO0FBQUQsQ0FBQyxBQTFIRCxJQTBIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTcGFyc2VNdWx0aUFycmF5LCBTcGFyc2VNdWx0aUFycmF5SW1wbCB9IGZyb20gJy4uL3V0aWxzL3NwYXJzZS1tdWx0aS1hcnJheSc7XG5pbXBvcnQgeyBJTmF2RWxlbWVudFR5cGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL25hdi1lbGVtZW50LXR5cGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IElIYXNXaXphcmRGZWF0dXJlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9oYXMtd2l6YXJkLWZlYXR1cmUuaW50ZXJmYWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdpemFyZEFic3RyYWN0Q29tcG9uZW50IGltcGxlbWVudHMgSUhhc1dpemFyZEZlYXR1cmUge1xuXG4gICAgLy8gQ29udHJhY3RcbiAgICBuYXZpZ2F0b3JDZmc6IElTcGFyc2VNdWx0aUFycmF5PElOYXZFbGVtZW50VHlwZT47XG4gICAgZGltSW5kaWNlOiBudW1iZXJbXTtcbiAgICBmb3J3YXJkRGltSW5kaWNlOiBudW1iZXJbXTtcbiAgICBzdGVwSW5kZXg6IG51bWJlcjtcblxuICAgIC8vIENvbnRyYWN0XG4gICAgbmF2aWdhdG9yOiBJTmF2RWxlbWVudFR5cGU7XG4gICAgZm9yd2FyZE5hdmlnYXRvcjogSU5hdkVsZW1lbnRUeXBlO1xuXG4gICAgLypcbiAgICAgKiBNYXhpbXVtIGRpbWVuc2lvblxuICAgICAqIFxuICAgICAqIFRoaXMgdmFsdWUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgbWF4aW11bSBzdGVwcyBmb3IgYW55IGNob2ljZS4gXG4gICAgICogVGhpbmsgYWJvdXQgdGhpcyBvbmUgYXMgdGhlIGhvcml6b250YWwgYXhpcy4gXG4gICAgICovXG4gICAgbWF4RGltOiBudW1iZXI7XG5cbiAgICAvLyBDb250cmFjdCBcbiAgICBnZXQgaGFzUHJldlN0ZXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBJbmRleCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGhhc05leHRTdGVwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3J3YXJkTmF2aWdhdG9yLmhhc05leHRTdGVwO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlTmV4dFN0ZXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcndhcmROYXZpZ2F0b3IuaGFzTmV4dEd1YXJkO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogT3ZlcnJpZGUgdGhlIG1ldGhvZCBhbmQgY29uZHVjdCB0aGUgZm9sbG93aW5nIFxuICAgICAqXG4gICAgICogXG4gICAgICAgIHRoaXMubmF2aWdhdG9yQ2ZnLnNldEVsZW1lbnQoe1xuICAgICAgICAgICAgaGFzUHJldlN0ZXA6IGZhbHNlLFxuICAgICAgICAgICAgaGFzTmV4dFN0ZXA6IHRydWUsXG4gICAgICAgICAgICBoYXNOZXh0R3VhcmQ6IGZhbHNlLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgICAgICB9LCAyKTtcblxuICAgICAgICB0aGlzLnN0ZXBJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuZGltSW5kaWNlID0gWzAsIDAsIDAsIDBdO1xuICAgICAgICB0aGlzLmZvcndhcmREaW1JbmRpY2UgPSBbMSwgMCwgMCwgMF07XG5cbiAgICAgICAgdGhpcy5uYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvckNmZy5nZXRFbGVtZW50KDEpO1xuICAgICAgICB0aGlzLmZvcndhcmROYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvckNmZy5nZXRFbGVtZW50KC4uLnRoaXMuZm9yd2FyZERpbUluZGljZSk7XG4gICAgKi9cbiAgICBidWlsZE5hdmlnYXRvckNmZygpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0b3JDZmcgPSBuZXcgU3BhcnNlTXVsdGlBcnJheUltcGwodGhpcy5tYXhEaW0sICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaGFzUHJldlN0ZXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhhc05leHRTdGVwOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBoYXNOZXh0R3VhcmQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aXNpYmxlKC4uLm51bWJlcnM6IG51bWJlcltdKSB7XG5cbiAgICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1heERpbTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBudW1iZXJzW2ldIHx8IDA7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmRpbUluZGljZVtpXTtcbiAgICAgICAgICAgIGZsYWcgPSBzb3VyY2UgPT09IHRhcmdldDtcbiAgICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmbGFnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBuZXh0U3RlcEludGVybmFsKCkge1xuICAgICAgICB0aGlzLmRpbUluZGljZSA9IFsuLi50aGlzLmZvcndhcmREaW1JbmRpY2VdO1xuICAgICAgICB0aGlzLm5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yQ2ZnLmdldEVsZW1lbnQoLi4udGhpcy5kaW1JbmRpY2UpO1xuXG4gICAgICAgIHRoaXMuc3RlcEluZGV4Kys7XG4gICAgICAgIC8vIElmIHRoZSBuZXh0IHN0ZXAgaXMgbm90IHRoZSBpbml0IHN0ZXAsIGxldCdzIHVzZSBpdCBkaXJlY3RseS5cbiAgICAgICAgaWYgKHRoaXMuZm9yd2FyZERpbUluZGljZVt0aGlzLnN0ZXBJbmRleF0gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZERpbUluZGljZVt0aGlzLnN0ZXBJbmRleF0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3J3YXJkTmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCguLi50aGlzLmZvcndhcmREaW1JbmRpY2UpO1xuICAgIH1cblxuICAgIG5leHRTdGVwKCkge1xuICAgICAgICAvLyBHdWFyZFxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlTmV4dFN0ZXApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvcndhcmROYXZpZ2F0b3IubmV4dFN0ZXApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZE5hdmlnYXRvci5uZXh0U3RlcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXh0U3RlcEludGVybmFsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2U3RlcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9yd2FyZE5hdmlnYXRvci5wcmV2U3RlcCkge1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkTmF2aWdhdG9yLnByZXZTdGVwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByZXZTdGVwSW50ZXJuYWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmV2U3RlcEludGVybmFsKCkge1xuICAgICAgICBpZiAodGhpcy5zdGVwSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAvLyBSZWNvdmVyIG91ciBvcHRpb25zIFxuICAgICAgICAgICAgdGhpcy5mb3J3YXJkRGltSW5kaWNlID0gWy4uLnRoaXMuZGltSW5kaWNlXTtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZE5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yQ2ZnLmdldEVsZW1lbnQoLi4udGhpcy5mb3J3YXJkRGltSW5kaWNlKTtcblxuICAgICAgICAgICAgdGhpcy5zdGVwSW5kZXgtLTtcbiAgICAgICAgICAgIHRoaXMuZGltSW5kaWNlW3RoaXMuc3RlcEluZGV4XSA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCguLi50aGlzLmRpbUluZGljZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=