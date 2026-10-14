export interface MeetingSession {
  id: string;
  dealId: string;
  brandName: string;
  brandContact: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: 'upcoming' | 'in_progress' | 'completed';
  recordingSavedToDrive: boolean;
  driveFileUrl?: string;
  serverPurged: boolean;
  transcriptSummary?: string;
}
