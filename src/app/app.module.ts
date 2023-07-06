import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NestedTableComponent } from './nested-table/nested-table.component';
import { ResizeColumnDirective } from './shared/resize-column.directive';

@NgModule({
  declarations: [AppComponent, NestedTableComponent, ResizeColumnDirective],
  imports: [BrowserModule, FormsModule, ScrollingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
