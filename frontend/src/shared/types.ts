export interface Document {
  id: string;
  name: string;
  level: number;
  parent_id: string;
  content?: string;
}

export interface Chapter extends Document {
  subChapters: Chapter[];
}
