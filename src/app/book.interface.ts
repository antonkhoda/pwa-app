export interface BookLibrary {
  offset: string;
  records: Book[];
}

export interface Book {
  createdTime: string;
  fields: BookFields;
  id: string;
}

export interface BookFields {
  Amazon_Link: string;
  Author: string;
  Country: string;
  Title: string;
  picture?: string;
}

export interface BookCover {
  id: string;
  picture: string;
}
