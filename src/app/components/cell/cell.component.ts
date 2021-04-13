import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less']
})
export class CellComponent implements OnInit {

  @Input() cells: Cell[];
  data: {
    name: 'aaa',
    age: '20'
    sex: '男'
  }

  constructor() { }

  ngOnInit(): void {
  }

}

interface Cell {
  propName?: string;
  title?: string;
  width?: string;
  height?: string;
  direction?: string;//row,col
  children?: Cell[];
}
