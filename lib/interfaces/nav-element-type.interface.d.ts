export interface INavElementType {
    hasPrevStep: boolean;
    hasNextStep: boolean;
    hasNextGuard: boolean;
    visible: boolean;
    nextStep?: any;
    prevStep?: any;
}
