import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-box',
  templateUrl: './dynamic-box.component.html',
  styleUrls: ['./dynamic-box.component.less']
})
export class DynamicBoxComponent implements OnInit {

  @Input() data: Node[];
  @Input() isRoot: boolean = true;
  constructor() { }

  ngOnInit(): void {

    
  }

}

interface Node {
  direction?: string;
  width?: string;
  prop?: string;
  propType?: string;
  children?: Node[];
}

enum PropType {
  img = 'img'
}
