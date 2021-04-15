import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.less']
})
export class DynamicTableComponent implements OnInit {

  @Input() data: Node[];
  @Input() border: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
}

interface Node {
  prop?: string;
  propType?: PropType;
  children?: Node[];
}

enum PropType {
  img = 'img',
  html = 'html'
}

