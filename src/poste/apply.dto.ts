export class ApplyDto {
  id: number;
  posteId: number;
  cv: string;
  lm: string;
  message?: string;
  applyAt: Date;
  posteName: string;
}