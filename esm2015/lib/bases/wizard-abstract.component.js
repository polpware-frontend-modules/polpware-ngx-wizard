import { SparseMultiArrayImpl } from '../utils/sparse-multi-array';
export class WizardAbstractComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWFic3RyYWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtd2l6YXJkLyIsInNvdXJjZXMiOlsibGliL2Jhc2VzL3dpemFyZC1hYnN0cmFjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFxQixvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSXRGLE1BQU0sT0FBZ0IsdUJBQXVCO0lBb0J6QyxZQUFZO0lBQ1osSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztNQWlCRTtJQUNGLGlCQUFpQjtRQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUMzRCxPQUFPO2dCQUNILFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLE9BQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBRyxPQUFpQjtRQUV4QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRVMsZ0JBQWdCO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGdFQUFnRTtRQUNoRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFFBQVE7UUFDSixRQUFRO1FBQ1IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEM7YUFBTTtZQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUUvRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEU7SUFDTCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU3BhcnNlTXVsdGlBcnJheSwgU3BhcnNlTXVsdGlBcnJheUltcGwgfSBmcm9tICcuLi91dGlscy9zcGFyc2UtbXVsdGktYXJyYXknO1xuaW1wb3J0IHsgSU5hdkVsZW1lbnRUeXBlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9uYXYtZWxlbWVudC10eXBlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBJSGFzV2l6YXJkRmVhdHVyZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvaGFzLXdpemFyZC1mZWF0dXJlLmludGVyZmFjZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaXphcmRBYnN0cmFjdENvbXBvbmVudCBpbXBsZW1lbnRzIElIYXNXaXphcmRGZWF0dXJlIHtcblxuICAgIC8vIENvbnRyYWN0XG4gICAgbmF2aWdhdG9yQ2ZnOiBJU3BhcnNlTXVsdGlBcnJheTxJTmF2RWxlbWVudFR5cGU+O1xuICAgIGRpbUluZGljZTogbnVtYmVyW107XG4gICAgZm9yd2FyZERpbUluZGljZTogbnVtYmVyW107XG4gICAgc3RlcEluZGV4OiBudW1iZXI7XG5cbiAgICAvLyBDb250cmFjdFxuICAgIG5hdmlnYXRvcjogSU5hdkVsZW1lbnRUeXBlO1xuICAgIGZvcndhcmROYXZpZ2F0b3I6IElOYXZFbGVtZW50VHlwZTtcblxuICAgIC8qXG4gICAgICogTWF4aW11bSBkaW1lbnNpb25cbiAgICAgKiBcbiAgICAgKiBUaGlzIHZhbHVlIGlzIGRldGVybWluZWQgYnkgdGhlIG1heGltdW0gc3RlcHMgZm9yIGFueSBjaG9pY2UuIFxuICAgICAqIFRoaW5rIGFib3V0IHRoaXMgb25lIGFzIHRoZSBob3Jpem9udGFsIGF4aXMuIFxuICAgICAqL1xuICAgIG1heERpbTogbnVtYmVyO1xuXG4gICAgLy8gQ29udHJhY3QgXG4gICAgZ2V0IGhhc1ByZXZTdGVwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGVwSW5kZXggPiAwO1xuICAgIH1cblxuICAgIGdldCBoYXNOZXh0U3RlcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZE5hdmlnYXRvci5oYXNOZXh0U3RlcDtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZU5leHRTdGVwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3J3YXJkTmF2aWdhdG9yLmhhc05leHRHdWFyZDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIE92ZXJyaWRlIHRoZSBtZXRob2QgYW5kIGNvbmR1Y3QgdGhlIGZvbGxvd2luZyBcbiAgICAgKlxuICAgICAqIFxuICAgICAgICB0aGlzLm5hdmlnYXRvckNmZy5zZXRFbGVtZW50KHtcbiAgICAgICAgICAgIGhhc1ByZXZTdGVwOiBmYWxzZSxcbiAgICAgICAgICAgIGhhc05leHRTdGVwOiB0cnVlLFxuICAgICAgICAgICAgaGFzTmV4dEd1YXJkOiBmYWxzZSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgfSwgMik7XG5cbiAgICAgICAgdGhpcy5zdGVwSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmRpbUluZGljZSA9IFswLCAwLCAwLCAwXTtcbiAgICAgICAgdGhpcy5mb3J3YXJkRGltSW5kaWNlID0gWzEsIDAsIDAsIDBdO1xuXG4gICAgICAgIHRoaXMubmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCgxKTtcbiAgICAgICAgdGhpcy5mb3J3YXJkTmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCguLi50aGlzLmZvcndhcmREaW1JbmRpY2UpO1xuICAgICovXG4gICAgYnVpbGROYXZpZ2F0b3JDZmcoKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdG9yQ2ZnID0gbmV3IFNwYXJzZU11bHRpQXJyYXlJbXBsKHRoaXMubWF4RGltLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhhc1ByZXZTdGVwOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBoYXNOZXh0U3RlcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzTmV4dEd1YXJkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlzaWJsZSguLi5udW1iZXJzOiBudW1iZXJbXSkge1xuXG4gICAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXhEaW07IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gbnVtYmVyc1tpXSB8fCAwO1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5kaW1JbmRpY2VbaV07XG4gICAgICAgICAgICBmbGFnID0gc291cmNlID09PSB0YXJnZXQ7XG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmxhZztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbmV4dFN0ZXBJbnRlcm5hbCgpIHtcbiAgICAgICAgdGhpcy5kaW1JbmRpY2UgPSBbLi4udGhpcy5mb3J3YXJkRGltSW5kaWNlXTtcbiAgICAgICAgdGhpcy5uYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvckNmZy5nZXRFbGVtZW50KC4uLnRoaXMuZGltSW5kaWNlKTtcblxuICAgICAgICB0aGlzLnN0ZXBJbmRleCsrO1xuICAgICAgICAvLyBJZiB0aGUgbmV4dCBzdGVwIGlzIG5vdCB0aGUgaW5pdCBzdGVwLCBsZXQncyB1c2UgaXQgZGlyZWN0bHkuXG4gICAgICAgIGlmICh0aGlzLmZvcndhcmREaW1JbmRpY2VbdGhpcy5zdGVwSW5kZXhdID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmREaW1JbmRpY2VbdGhpcy5zdGVwSW5kZXhdID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9yd2FyZE5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yQ2ZnLmdldEVsZW1lbnQoLi4udGhpcy5mb3J3YXJkRGltSW5kaWNlKTtcbiAgICB9XG5cbiAgICBuZXh0U3RlcCgpIHtcbiAgICAgICAgLy8gR3VhcmRcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZU5leHRTdGVwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb3J3YXJkTmF2aWdhdG9yLm5leHRTdGVwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmROYXZpZ2F0b3IubmV4dFN0ZXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubmV4dFN0ZXBJbnRlcm5hbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldlN0ZXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0ZXBJbmRleCA+IDApIHtcbiAgICAgICAgICAgIC8vIFJlY292ZXIgb3VyIG9wdGlvbnMgXG4gICAgICAgICAgICB0aGlzLmZvcndhcmREaW1JbmRpY2UgPSBbLi4udGhpcy5kaW1JbmRpY2VdO1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkTmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCguLi50aGlzLmZvcndhcmREaW1JbmRpY2UpO1xuXG4gICAgICAgICAgICB0aGlzLnN0ZXBJbmRleC0tO1xuICAgICAgICAgICAgdGhpcy5kaW1JbmRpY2VbdGhpcy5zdGVwSW5kZXhdID0gMDtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCguLi50aGlzLmRpbUluZGljZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=