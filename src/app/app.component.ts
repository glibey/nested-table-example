import { Component } from '@angular/core';
import { MockDataService } from './shared/mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockDataService],
})
export class AppComponent {
  title = 'nested-table-example';

  mockData$ = this.mockData.get();

  constructor(private mockData: MockDataService) {}
}
