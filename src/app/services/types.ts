export type UploadStatus = "pending" | "processed" | "error";

export type Metrics = {
  rows: number;
  columns: number;
  missingRatio: number;
  cmmBySku?: Record<string, number>;
  leadTimeDaysAvg?: number;
  anomalies?: string[];
};

export type UploadDoc = {
  ownerUid: string;
  fileName: string;
  fileSize: number;
  status: UploadStatus;
  createdAt: any;          // firestore Timestamp
  processedAt?: any;
  errorMessage?: string | null;
  metrics?: Metrics | null;
  insights?: string | null;
  storagePath?: string | null; // ficará null no MVP (sem Storage)
};
