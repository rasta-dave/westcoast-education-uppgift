export interface ISchedule {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string;
  type: 'classroom' | 'distance';
  location?: string;
  availableSeats: number;
}
