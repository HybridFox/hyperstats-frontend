export interface Information {
    reportingYear: number;
    recyclingProcess: string;
    name: string;
    receiver: string;
}

export interface InputFraction {
    type: string;
    weight: number;
    chemicalComposition: ChemicalComposition;
}

interface ChemicalComposition {
    element: string;
    weight: number;
}

export interface Additives {
    processChemistry: string;
    weightInput: number;
    shareOfBatteryType: number;
    weightBatteryType: number;
    excessMaterialReceived: ExcessMaterialReceived[];
    elements: AdditivesElements[];
    descriptionOfMethodologyShare: string;
    descriptionOfMethodologyChemicalComposition: string;
    massOfExternalJacket: number;
    massOfOuterCasings: number;
}

interface ExcessMaterialReceived {
    impurities: number;
    PackagingMaterial: number;
}

interface AdditivesElements {
    element: string;
    mass: number;
}

export interface OutputFraction {
    element: string;
    share: string;
    mass: string;
    classification: string;
    replacedMaterial: string;
    elementClassification: string;
    elementReplacedMaterial: string;
}

export interface RecyclingEfficiency {
    calculatedEfficiency: number;
}

export interface AdditionalInformation {
    files: string[];
    additionalInformation: string;
 }

 export interface Meta {
    approvedCompanies: string[];
    reportingCompany: string;
    created: string;
    lastUpdated: string;
    deleted: boolean;
    status: string;
 }

export interface Report {
    _id: string;
    data: {
        information: Information,
        inputFraction: InputFraction[],
        additives: Additives[],
        outputFraction: OutputFraction[],
        recyclingEfficiency: RecyclingEfficiency,
        additionalInformation: AdditionalInformation,
    };
    meta: Meta;
}
