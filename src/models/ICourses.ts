export interface ICourse {
  id?: string;
  title: string;
  courseNumber: string;
  length: number;
  description: string;
  imageUrl: string;
  isClassroom: boolean;
  isDistance: boolean;
  price: number;
  startDate: string;
}
