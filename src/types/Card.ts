export type ICards = ICard[];

export interface ICard {
  image: string;
  filesize: number;
  timestamp: number | string;
  category: string;
}
