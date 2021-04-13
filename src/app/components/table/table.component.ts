import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  constructor() { }
  data;
  ngOnInit(): void {
    this.data = [
      [[[11, 22, 33, 44],
      [55, 66, 77, 88],
      [99, 1010, 1111, 1212]
      ], 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]
  }

  dealData(datas: any[]) {
    let row = datas.length;
    let col = datas[0].length;
    datas.forEach((tr, trIndex) => {
      tr.forEach((td, tdIndex) => {
        const isArray = td instanceof Array;
        if (!isArray) {
          return;
        }
      

        // todo
        this.dealData(td)
      })
    });
  }
}



