export interface Step {
  name: string;
  route: string;
  key: string;
}

export interface Information {
  reportingYear: number;
  recyclingProcess: string | PopulatedRecyclingProcess;
  name: string;
  receiver: string;
}

export interface PopulatedRecyclingProcess {
  _id: string;
  data: {
    name: string;
  };
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
  water: number;
  otherMaterials: number;
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
  elementDestinationIndustry: string;
  elementDestinationCompany: string;
  assignedStep: string;
}

export interface RecyclingEfficiency {
  calculatedEfficiency: number;
}

export interface AdditionalInformation {
  files: string[];
  additionalInformation: string;
}

export interface Meta {
  approvedCompanies: ApprovedCompany[];
  reportingCompany: string | ReportingCompany;
  created: string;
  lastUpdated: string;
  deleted: boolean;
  status: string;
  state: MetaState;
}

interface MetaState {
  isPristine: boolean;
}

export interface ReportingCompany {
  _id: string;
  data: {
    name: string;
  };
}

interface ApprovedCompany {
  approvedBy: string;
  company: string;
  linkedApprovals: string[];
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