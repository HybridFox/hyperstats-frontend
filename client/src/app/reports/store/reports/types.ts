export interface Step {
    name: string;
    route: string;
    key: string;
}

export interface Information {
    reportingYear: number;
    recyclingProcess: string;
    name: string;
    receiver: string;
}

export interface InputFraction {
    siteRef: string;
    data: InputFractionData;
}

export interface InputFractionData {
    processChemistry: string;
    weightInput: number;
    shareOfBatteryType: number;
    weightBatteryType: number;
    excessMaterialReceived: ExcessMaterialReceived[];
    elements: AdditionalElement[];
    descriptionOfMethodologyShare: string;
    descriptionOfMethodologyChemicalComposition: string;
    massOfExternalJacket: number;
    massOfOuterCasings: number;
}

interface ChemicalComposition {
    element: string;
    weight: number;
}

export interface Additives {
  siteRef: string;
  data: AdditivesData;
}

export interface AdditivesData {
    type: string;
    weight: number;
    chemicalComposition: ChemicalComposition;
}

export interface ExcessMaterialReceived {
    impurities: number;
    packagingMaterial: number;
}

export interface AdditionalElement {
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
    state: MetaState;
 }

 interface MetaState {
  isPrestine: boolean;
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

export interface SiteRef {
  siteRef: string;
}
