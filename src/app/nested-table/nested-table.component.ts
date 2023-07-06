import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TableItem } from '../shared/table-item.interface';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.css'],
})
export class NestedTableComponent {
  @Input() data: TableItem[] = [];
  @Input() selectedRows: TableItem[] = [];
  @Input() isEditActive: boolean = true;
  @Output() rowSelected = new EventEmitter();
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  searchQuery = '';
  filteredRows: TableItem[] = [];
  selectAll = false;
  hoveredIndex = -1;

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((term: string) => {
        this.search(term);
      });

    this.filteredRows = this.data;
  }

  toggleRow(item: TableItem) {
    item.expanded = !item.expanded;
  }

  handleRowSelection(item: TableItem) {
    if (item.selected) {
      if (!this.selectedRows.includes(item)) {
        this.selectedRows.push(item);
      }
    } else {
      const index = this.selectedRows.findIndex(
        (selectedRow) => selectedRow === item
      );
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      }
    }

    this.rowSelected.emit(this.selectedRows);
  }

  toggleSelectAll() {
    if (this.selectAll) {
      this.data.map((item) => (item.selected = true));
      this.selectedRows = [...this.data];
    } else {
      this.data.map((item) => (item.selected = false));
      this.selectedRows = [];
    }

    this.rowSelected.emit(this.selectedRows);
  }

  deleteSelectedRows() {
    // Implement the delete functionality for selected rows
  }

  removeRowItem(item: TableItem) {
    // Implement the remove row item functionality for selected rows
  }

  editRowItem(item: TableItem) {
    // Implement the edit row item functionality for selected rows
  }

  private search(term: string): TableItem[] {
    if (!term) {
      this.filteredRows = this.data;
    } else {
      this.filteredRows = this.data.reduce((result: TableItem[], element) => {
        if (element?.children) {
          let filteredList = element.children.filter(
            (item) =>
              item.name.toLowerCase().includes(term) ||
              item.type.toLowerCase().includes(term.toLowerCase()) ||
              item.email.toLowerCase().includes(term.toLowerCase()) ||
              item.phoneNo.toLowerCase().includes(term.toLowerCase()) ||
              item.companyName.toLowerCase().includes(term.toLowerCase())
          );
          if (filteredList.length > 0) {
            result.push({ ...element });
          }
        }
        return result;
      }, []);
    }

    return this.filteredRows;
  }
}
