import { Injectable } from '@angular/core';

import { Observable, forkJoin, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { bookCover, bookUrl } from '../mocks/book.mock';
import { Book, BookLibrary } from '../../shop/book.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getStoreUrl(): Observable<string> {
    return of(bookUrl);
  }

  public getLibrary(url: string): Observable<BookLibrary> {
    return this.http.get<BookLibrary>(url);
  }

  public getBookCoverDictionary(): Observable<Map<string, string>> {
    return of(bookCover).pipe(
      map((covers) => {
        const dictionary = new Map<string, string>();

        covers.forEach((element) => {
          dictionary.set(element.id, element.picture);
        });
        return dictionary;
      })
    );
  }

  public getCompiledLibraryData(url: string): Observable<Book[]> {
    return forkJoin([this.getLibrary(url), this.getBookCoverDictionary()]).pipe(
      map(([data, mapperBookCover]) => {
        return data.records.map((book) => ({
          ...book,
          fields: {
            ...book.fields,
            price: Math.floor((Math.random() * (15 - 5) + 5) * 100) / 100,
            picture: mapperBookCover.get(book.id),
          },
        }));
      })
    );
  }
}
