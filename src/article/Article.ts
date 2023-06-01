import { PosteDTO } from "../poste/poste.dto";

export type TDecor = "circle1" | "circle2" | "circle3" | "circle4" | "rect1" | "rect2" | "rect3";
export type TAniationDelay = 100 | 200 | 300 | 400 | 500 | 600;

export interface IDecor {
  type: TDecor,
  animateDelay?: TAniationDelay
}

export interface IFullParagraph {
  reverse?: boolean,
  title?: string,
  icon?: string,
  image?: string,
  content?: string,
  singleCol?: boolean,
  poste?: PosteDTO[]
}

export interface IFullSection {
  sectionTitle?: string,
  sectionId?: string,
  onWhite?: boolean,
  decors?: IDecor[],
  paragraphs?: IFullParagraph[],
}