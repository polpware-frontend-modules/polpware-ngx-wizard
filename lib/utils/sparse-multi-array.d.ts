export interface ISparseMultiArray<T> {
    getElement(...numbers: number[]): T;
    setElement(val: T, ...numbers: number[]): void;
}
export declare class SparseMultiArrayImpl<T> {
    private readonly _impl;
    private readonly _maxDim;
    private readonly _factory;
    constructor(maxDim: number, ctor: () => T);
    getElement(...numbers: number[]): T;
    setElement(val: T, ...numbers: number[]): void;
}
//# sourceMappingURL=sparse-multi-array.d.ts.map