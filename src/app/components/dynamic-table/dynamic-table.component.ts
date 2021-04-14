import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.less']
})
export class DynamicTableComponent implements OnInit {

  @Input() data: Cell[];
  nodes: Node[];
  constructor() { }


  ngOnInit(): void {
    this.initData()
    // console.log(this.nodes)
  }

  initData() {
    // add level
    const treeNode: Node = this.addRoot(this.data);
    const temp = this.convertTreeToList(treeNode);
    temp.shift();
    this.nodes = temp;
  }

  addRoot(menus: Cell[]): Node {
    let root = {
      prop: Math.random().toString(),
      children: menus
    }
    return root;
  }

  convertTreeToList(root: Node): Node[] {
    const stack: Node[] = [];
    const array: Node[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0 });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, parent: node });
        }
      }
    }
    return array;
  }

  visitNode(node: Node, hashMap: { [key: string]: boolean }, array: Node[]): void {
    if (!hashMap[node.prop]) {
      hashMap[node.prop] = true;
      array.push(node);
    }
  }

}


interface Cell {
  prop?: string;
  children: Cell[];
}

interface Node {
  prop?: string;
  parent?: Node;
  level?: number;
  children: Cell[];
}