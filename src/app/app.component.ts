import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './data.service';
import { BookFields, Book } from './book.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public library!: Book[];
  public currentBook!: BookFields;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private data: DataService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.data.getCompiledLibraryData().subscribe((data) => {
        this.library = data;
        this.getRandomBook();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getRandomBook(): void {
    this.currentBook =
      this.library[Math.floor(Math.random() * this.library.length)].fields;
  }

  public selectLanguage(value: string): void {
    this.translateService.use(value);
  }
}
