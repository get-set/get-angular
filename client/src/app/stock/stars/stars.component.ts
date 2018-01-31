import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import index from '@angular/cli/lib/cli';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input()
  rating = 0;

  @Input()
  readonly = false;

  @Output()
  ratingChange: EventEmitter<number> = new EventEmitter();

  stars: boolean[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

  clickStar(i: number) {
    if (!this.readonly) {
      this.rating = i + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
