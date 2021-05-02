import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss'],
})
export class ViewHistoryComponent implements OnInit, OnChanges {
  @Input() public showHistory = false;
  @Output() public closeModal = new EventEmitter<any>();
  public historyList = [];
  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges() {
    this.historyList = JSON.parse(
      localStorage.getItem('GENERATED_NUMBER_LIST')
    );
    if (this.historyList && this.historyList.length) {
      this.historyList = this.historyList.reverse();
    }
  }

  public close() {
    this.closeModal.emit();
  }
}
