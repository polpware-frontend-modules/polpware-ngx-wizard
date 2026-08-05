interface ISparseMultiArray<T> {
    getElement(...numbers: number[]): T;
    setElement(val: T, ...numbers: number[]): void;
}
declare class SparseMultiArrayImpl<T> {
    private readonly _impl;
    private readonly _maxDim;
    private readonly _factory;
    constructor(maxDim: number, ctor: () => T);
    getElement(...numbers: number[]): T;
    setElement(val: T, ...numbers: number[]): void;
}

interface INavElementType {
    hasPrevStep: boolean;
    hasNextStep: boolean;
    hasNextGuard: boolean;
    visible: boolean;
    nextStep?: any;
    prevStep?: any;
}

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
interface IHasWizardFeature {
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

declare abstract class WizardAbstractComponent implements IHasWizardFeature {
    navigatorCfg: ISparseMultiArray<INavElementType>;
    dimIndice: number[];
    forwardDimIndice: number[];
    stepIndex: number;
    navigator: INavElementType;
    forwardNavigator: INavElementType;
    maxDim: number;
    get hasPrevStep(): boolean;
    get hasNextStep(): boolean;
    get disableNextStep(): boolean;
    buildNavigatorCfg(): void;
    visible(...numbers: number[]): boolean;
    protected nextStepInternal(): void;
    nextStep(): void;
    prevStep(): void;
    protected prevStepInternal(): void;
}

export { SparseMultiArrayImpl, WizardAbstractComponent };
export type { IHasWizardFeature, INavElementType, ISparseMultiArray };
//# sourceMappingURL=polpware-ngx-wizard.d.ts.map
