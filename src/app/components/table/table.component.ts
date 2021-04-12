import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  constructor() { }
  data = [];
  ngOnInit(): void {
    this.data = [
      [1, 2, 3, 4],
      [5, 6, null, null],
      [null, 10, 11, null],
      [null, 14, 15, 16]
    ]
  }
}

interface Cell {
  lable?: string;
  prop?: string;
}


