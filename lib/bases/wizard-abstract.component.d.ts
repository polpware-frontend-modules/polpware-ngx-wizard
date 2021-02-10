import { ISparseMultiArray } from '../utils/sparse-multi-array';
import { INavElementType } from '../interfaces/nav-element-type.interface';
import { IHasWizardFeature } from '../interfaces/has-wizard-feature.interface';
export declare abstract class WizardAbstractComponent implements IHasWizardFeature {
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
}
