import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-legality-validation',
  templateUrl: './page-legality-validation.component.html',
  styleUrls: ['./page-legality-validation.component.scss'],
})
export class PageLegalityValidationComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

}
