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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWFic3RyYWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtd2l6YXJkLyIsInNvdXJjZXMiOlsibGliL2Jhc2VzL3dpemFyZC1hYnN0cmFjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFxQixvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSXRGLE1BQU0sT0FBZ0IsdUJBQXVCO0lBb0J6QyxZQUFZO0lBQ1osSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztNQWlCRTtJQUNGLGlCQUFpQjtRQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUMzRCxPQUFPO2dCQUNILFdBQVcsRUFBRSxLQUFLO2dCQUNsQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLE9BQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBRyxPQUFpQjtRQUV4QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRVMsZ0JBQWdCO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGdFQUFnRTtRQUNoRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFFBQVE7UUFDSixRQUFRO1FBQ1IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEM7YUFBTTtZQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3BDO2FBQU07WUFDSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFUyxnQkFBZ0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNwQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFL0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNwYXJzZU11bHRpQXJyYXksIFNwYXJzZU11bHRpQXJyYXlJbXBsIH0gZnJvbSAnLi4vdXRpbHMvc3BhcnNlLW11bHRpLWFycmF5JztcbmltcG9ydCB7IElOYXZFbGVtZW50VHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvbmF2LWVsZW1lbnQtdHlwZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSUhhc1dpemFyZEZlYXR1cmUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2hhcy13aXphcmQtZmVhdHVyZS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2l6YXJkQWJzdHJhY3RDb21wb25lbnQgaW1wbGVtZW50cyBJSGFzV2l6YXJkRmVhdHVyZSB7XG5cbiAgICAvLyBDb250cmFjdFxuICAgIG5hdmlnYXRvckNmZzogSVNwYXJzZU11bHRpQXJyYXk8SU5hdkVsZW1lbnRUeXBlPjtcbiAgICBkaW1JbmRpY2U6IG51bWJlcltdO1xuICAgIGZvcndhcmREaW1JbmRpY2U6IG51bWJlcltdO1xuICAgIHN0ZXBJbmRleDogbnVtYmVyO1xuXG4gICAgLy8gQ29udHJhY3RcbiAgICBuYXZpZ2F0b3I6IElOYXZFbGVtZW50VHlwZTtcbiAgICBmb3J3YXJkTmF2aWdhdG9yOiBJTmF2RWxlbWVudFR5cGU7XG5cbiAgICAvKlxuICAgICAqIE1heGltdW0gZGltZW5zaW9uXG4gICAgICogXG4gICAgICogVGhpcyB2YWx1ZSBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBtYXhpbXVtIHN0ZXBzIGZvciBhbnkgY2hvaWNlLiBcbiAgICAgKiBUaGluayBhYm91dCB0aGlzIG9uZSBhcyB0aGUgaG9yaXpvbnRhbCBheGlzLiBcbiAgICAgKi9cbiAgICBtYXhEaW06IG51bWJlcjtcblxuICAgIC8vIENvbnRyYWN0IFxuICAgIGdldCBoYXNQcmV2U3RlcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcEluZGV4ID4gMDtcbiAgICB9XG5cbiAgICBnZXQgaGFzTmV4dFN0ZXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcndhcmROYXZpZ2F0b3IuaGFzTmV4dFN0ZXA7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVOZXh0U3RlcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZE5hdmlnYXRvci5oYXNOZXh0R3VhcmQ7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBPdmVycmlkZSB0aGUgbWV0aG9kIGFuZCBjb25kdWN0IHRoZSBmb2xsb3dpbmcgXG4gICAgICpcbiAgICAgKiBcbiAgICAgICAgdGhpcy5uYXZpZ2F0b3JDZmcuc2V0RWxlbWVudCh7XG4gICAgICAgICAgICBoYXNQcmV2U3RlcDogZmFsc2UsXG4gICAgICAgICAgICBoYXNOZXh0U3RlcDogdHJ1ZSxcbiAgICAgICAgICAgIGhhc05leHRHdWFyZDogZmFsc2UsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICAgIH0sIDIpO1xuXG4gICAgICAgIHRoaXMuc3RlcEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5kaW1JbmRpY2UgPSBbMCwgMCwgMCwgMF07XG4gICAgICAgIHRoaXMuZm9yd2FyZERpbUluZGljZSA9IFsxLCAwLCAwLCAwXTtcblxuICAgICAgICB0aGlzLm5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yQ2ZnLmdldEVsZW1lbnQoMSk7XG4gICAgICAgIHRoaXMuZm9yd2FyZE5hdmlnYXRvciA9IHRoaXMubmF2aWdhdG9yQ2ZnLmdldEVsZW1lbnQoLi4udGhpcy5mb3J3YXJkRGltSW5kaWNlKTtcbiAgICAqL1xuICAgIGJ1aWxkTmF2aWdhdG9yQ2ZnKCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRvckNmZyA9IG5ldyBTcGFyc2VNdWx0aUFycmF5SW1wbCh0aGlzLm1heERpbSwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoYXNQcmV2U3RlcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzTmV4dFN0ZXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhhc05leHRHdWFyZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpc2libGUoLi4ubnVtYmVyczogbnVtYmVyW10pIHtcblxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWF4RGltOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IG51bWJlcnNbaV0gfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZGltSW5kaWNlW2ldO1xuICAgICAgICAgICAgZmxhZyA9IHNvdXJjZSA9PT0gdGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCFmbGFnKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG5leHRTdGVwSW50ZXJuYWwoKSB7XG4gICAgICAgIHRoaXMuZGltSW5kaWNlID0gWy4uLnRoaXMuZm9yd2FyZERpbUluZGljZV07XG4gICAgICAgIHRoaXMubmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCguLi50aGlzLmRpbUluZGljZSk7XG5cbiAgICAgICAgdGhpcy5zdGVwSW5kZXgrKztcbiAgICAgICAgLy8gSWYgdGhlIG5leHQgc3RlcCBpcyBub3QgdGhlIGluaXQgc3RlcCwgbGV0J3MgdXNlIGl0IGRpcmVjdGx5LlxuICAgICAgICBpZiAodGhpcy5mb3J3YXJkRGltSW5kaWNlW3RoaXMuc3RlcEluZGV4XSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkRGltSW5kaWNlW3RoaXMuc3RlcEluZGV4XSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcndhcmROYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvckNmZy5nZXRFbGVtZW50KC4uLnRoaXMuZm9yd2FyZERpbUluZGljZSk7XG4gICAgfVxuXG4gICAgbmV4dFN0ZXAoKSB7XG4gICAgICAgIC8vIEd1YXJkXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVOZXh0U3RlcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZm9yd2FyZE5hdmlnYXRvci5uZXh0U3RlcCkge1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkTmF2aWdhdG9yLm5leHRTdGVwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5leHRTdGVwSW50ZXJuYWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXZTdGVwKCkge1xuICAgICAgICBpZiAodGhpcy5mb3J3YXJkTmF2aWdhdG9yLnByZXZTdGVwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmROYXZpZ2F0b3IucHJldlN0ZXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJldlN0ZXBJbnRlcm5hbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHByZXZTdGVwSW50ZXJuYWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0ZXBJbmRleCA+IDApIHtcbiAgICAgICAgICAgIC8vIFJlY292ZXIgb3VyIG9wdGlvbnMgXG4gICAgICAgICAgICB0aGlzLmZvcndhcmREaW1JbmRpY2UgPSBbLi4udGhpcy5kaW1JbmRpY2VdO1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkTmF2aWdhdG9yID0gdGhpcy5uYXZpZ2F0b3JDZmcuZ2V0RWxlbWVudCguLi50aGlzLmZvcndhcmREaW1JbmRpY2UpO1xuXG4gICAgICAgICAgICB0aGlzLnN0ZXBJbmRleC0tO1xuICAgICAgICAgICAgdGhpcy5kaW1JbmRpY2VbdGhpcy5zdGVwSW5kZXhdID0gMDtcblxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0b3IgPSB0aGlzLm5hdmlnYXRvckNmZy5nZXRFbGVtZW50KC4uLnRoaXMuZGltSW5kaWNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==