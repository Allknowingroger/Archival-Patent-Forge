
export interface PatentData {
  id: string;
  inventionName: string;
  inventor: string;
  date: string;
  patentNumber: string;
  specification: string;
  claims: string[];
  imageUrl: string;
}

export interface GenerationStatus {
  step: 'idle' | 'drafting' | 'illustrating' | 'finalizing' | 'error';
  message: string;
}
