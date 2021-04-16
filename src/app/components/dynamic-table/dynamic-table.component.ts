import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.less'],
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
  width?: string;
  height?: string;
  propType?: PropType;
  children?: Node[];
}

enum PropType {
  img = 'img'
}

