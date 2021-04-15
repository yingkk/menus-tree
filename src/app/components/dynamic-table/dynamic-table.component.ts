import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.less']
})
export class DynamicTableComponent implements OnInit {

  @Input() data: Node[];
  @Input() border: boolean = true;

  tempHtml: string = "<span>这是一段Html文本</span>"
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
  img = 'img'
}

