export interface RecyclingProcess {
  data: Data;
  meta: Meta;
  id: string;
}

interface Data {
  name: string;
  steps: Step[];
}

interface Step {
  description: string;
  methodOfProcessing: string;
  precedingStep: string;
  qualitativeDescription: QualitativeDescription;
  schematicOverview: Asset;
  site: string;
  uuid: string;
}

interface QualitativeDescription {
  asset: Asset;
  text: string;
}

interface Asset {
  id: string;
  mimetype: string;
  originalname: string;
  uploadDate: string;
}

interface Meta {
  activated: boolean;
  created: string;
  deleted: boolean;
  lastUpdated: string;
}
