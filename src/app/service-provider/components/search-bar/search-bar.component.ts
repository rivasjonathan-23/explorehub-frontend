import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public textSearch: string;
  @Output() search: EventEmitter<any> = new EventEmitter()
  @Input() placeHolder: string = "Search"
  constructor() { }

  ngOnInit() {}

  reset() {
    setTimeout(() => {
      this.textSearch = ""
      this.search.emit(null)
    }, 200);
  }

  typing() {
    this.search.emit(this.textSearch.trim())
  }

}
