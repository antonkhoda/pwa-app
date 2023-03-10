import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookFields, DataService, Library } from './data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public library!: Library;
  public book!: BookFields;
  private subscriptions: Subscription = new Subscription();

  constructor(private data: DataService, private translateService: TranslateService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.data.getLibrary().subscribe((data) => {
        this.library = data;
        this.getRandomBook();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getRandomBook(): void {
    this.book =
      this.library.records[
        Math.floor(Math.random() * this.library.records.length)
      ].fields;
  }

  public selectLanguage(value: string): void {
    this.translateService.use(value);
  }
}
