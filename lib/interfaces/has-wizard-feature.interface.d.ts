import { ISparseMultiArray } from '../utils/sparse-multi-array';
import { INavElementType } from './nav-element-type.interface';
/**

This wizard models the use case for:
   First step, second step, third step, ...

Thus, the navigation configuration is a multi-dimension array.

The "stepIndex" property is to denote the index of the current step.
E.g., if we are at the first step, the index is 0.

The "dimIndice" property denotes the position for the configuration
applied to the current UI.

The "forwardDimIndice" property denotes the position for the configuration
applied to the UI for the next step. This should be updated if a choice is changed.


First step:
  [0]
  

First step:
  s1 [1]
  s2 [2]
  s3 [3]

Second step:
  s1
 
 */
export interface IHasWizardFeature {
    navigatorCfg: ISparseMultiArray<INavElementType>;
    dimIndice: number[];
    forwardDimIndice: number[];
    stepIndex: number;
    navigator: INavElementType;
    forwardNavigator: INavElementType;
    readonly hasNextStep: boolean;
    readonly hasPrevStep: boolean;
    readonly disableNextStep: boolean;
    /**
     * Build up the navigator configuration
     */
    buildNavigatorCfg(): void;
    visible(...numbers: number[]): boolean;
    nextStep(): void;
    prevStep(): void;
}
