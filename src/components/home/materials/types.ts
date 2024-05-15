export interface IMaterialItem {
  id: number;
  alert?: string;
  name: string;
  quantity: number;
  weeksForRefueling: number;
}

export interface IMaterialList {
  [key: string]: IMaterialItem[];
}
