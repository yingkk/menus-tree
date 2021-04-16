import { Component, HostBinding, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.less'],
})
export class DynamicTableComponent implements OnInit{

  @Input() data: Node[];
  @Input() isRoot: boolean = true;

  constructor() { }

  ngOnInit(): void {

    // const items = this.convert2Tree(this.data, 1)
  }

  // convert2Tree(data: Node[], level: number): Tree[] {
  //   let result: Tree[] = []
  //   data.forEach(t => {
  //     let tempItem: Tree = {
  //       ...t,
  //       level: level,
  //       children: undefined
  //     }
  //     result.push(tempItem)
  //     if (t.children && t.children.length > 0) {
  //       tempItem.children = this.convert2Tree(t.children, level + 1)
  //     }
  //   })
  //   return result;
  // }
}

interface Node {
  prop?: string;
  propType?: PropType;
  children?: Node[];
}

enum PropType {
  img = 'img'
}

