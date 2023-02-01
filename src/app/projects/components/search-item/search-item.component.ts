import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { debounceTimeValue } from '@constants/constants';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements AfterViewInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef | undefined;

  @ViewChild('searchForm', { static: false }) searchForm: ElementRef | undefined;

  @Output() search = new EventEmitter<string>();

  ngAfterViewInit(): void {
    fromEvent<InputEvent>(this.searchInput?.nativeElement, 'input')
      .pipe(
        map((event: InputEvent): string => (event.target as HTMLInputElement).value.trim().toLowerCase()),
        map((value: string): string => (value.length >= 3 ? value : '')),
        debounceTime(debounceTimeValue),
        distinctUntilChanged(),
      )
      .subscribe((value: string): void => this.search.emit(value));
  }
}
