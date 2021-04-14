import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  constructor() { }
  data = [
    {
      prop: '1',
      children: [
        {
          prop: '1-1',
          children: [
            {
              prop: '1-1-1',
              children: [
                {
                  prop: '1-1-1-1'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      prop: '2',
      children: [
        {
          prop: '2-1',
        },
        {
          prop: '2-2'
        }
      ]
    },
    {
      prop: '3',
      children: [
        {
          prop: '3-1'
        }
      ]
    }
  ]

  cells = [
    // row
    {
      direction: 'row',
      children: [
        {
          propName: 'bbbbb',
        },
        {
          propName: 'ccccc'
        },
        {
          propName: 'ddddd'
        },
        {
          propName: 'eeeeee'
        }
      ]
    },
    {
      direction: 'row',
      children: [
        {
          direction: 'col',
          children: [
            {
              propName: 'gggggg'
            }
          ]
        },
        {
          direction: 'col',
          children: [
            {
              propName: 'iiiiiiiiiii'
            },
            {
              propName: 'jjjjjjjjjjj'
            }
          ]
        },
        {
          direction: 'col',
          children: [
            {
              propName: 'kkkkkkkkkkk'
            },
            {
              propName: 'mmmmmmmm'
            }
          ]
        },
      ]
    },
    {
      bgColor: '#e6f7ff',
      propName: 'nnnnnnn'
    }




    // col
    // {
    //   propName: 'aaaaa',
    //   direction: 'row',
    //   children: [
    //     {
    //       propName: 'bbbb',
    //       direction: 'col',
    //       children: [
    //         {
    //           propName: 'eeeeee'
    //         },
    //         {
    //            propName: 'ccccc'
    //         },
    //         {
    //           propName: 'ddddd'
    //         }
    //       ]
    //     },
    //     {
    //       propName: 'hhhhhh',
    //       direction: 'col',
    //       children: [
    //         {
    //           propName: 'iiiiiiii'
    //         },
    //         {
    //           propName: 'jjjjjjjjj'
    //         }
    //       ]
    //     },
    //     {
    //       propName: 'ffffff'
    //     },
    //     {
    //       propName: 'gggggg'
    //     },
    //   ]
    // }





    // {
    //   propName: 'name',
    //   direction: 'col',
    //   children: [
    //     {
    //       direction: 'row',
    //       propName: 'ooooooo',
    //       children: [
    //         {
    //           propName: 'age',
    //         },
    //         {
    //           propName: 'sex',
    //         },
    //       ]
    //     },
    //     {
    //       direction: 'row',
    //       propName: 'jjjjjj',
    //       children: [
    //         {
    //           propName: 'qqqqqq',
    //         },
    //         {
    //           propName: 'mmmmmmm',
    //         },
    //       ]
    //     }
    //   ]
    // },
    // {
    //   propName: 'aaaaaaaaa',
    //   direction: 'row',
    //   children: [
    //     {
    //       direction: 'col',
    //       propName: 'tttttttt',
    //       children: [
    //         {
    //           propName: 'age',
    //         },
    //         {
    //           propName: 'sex',
    //         },
    //       ]
    //     },
    //     {
    //       direction: 'col',
    //       propName: 'hhhhh',
    //       children: [
    //         {
    //           propName: 'bbbbbb',
    //         },
    //         {
    //           propName: 'vvvvvvv',
    //         },
    //       ]
    //     }
    //   ]
    // }
  ]

  menus: MenuItem[] = [
    {
      id: "1",
      name: "test1",
      res_name: "test1",
      url: "/sys/user1",
      icon: "user1",
      permId: "1",
      subMenus: [
        {
          id: "1-1",
          name: "test1-1",
          res_name: "test1-1",
          url: "/sys/user1-1",
          icon: "user1-1",
          permId: "1-1",
          subMenus: [
            {
              id: "1-1-1",
              name: "test1-1-1",
              res_name: "test1-1-1",
              url: "/sys/user1-1-1",
              icon: "user1-1-1",
              permId: "1-1-1",
            }
          ]
        },
        {
          id: "1-2",
          name: "test1-2",
          res_name: "test1-2",
          url: "/sys/user1-2",
          icon: "user1-2",
          permId: "1-2",
        },
        {
          id: "1-3",
          name: "test1-3",
          res_name: "test1-3",
          url: "/sys/user1-3",
          icon: "user1-3",
          permId: "1-3",
        },
        {
          id: "1-4",
          name: "test1-4",
          res_name: "test1-4",
          url: "/sys/user1-4",
          icon: "user1-4",
          permId: "1-4",
        }
      ]
    },
    {
      id: "2",
      name: "test2",
      res_name: "test2",
      url: "/sys/user2",
      icon: "user2",
      permId: "2",
    }
  ]

  ngOnInit(): void {

  }

}

export interface MenuItem {
  id: string;
  name: string;
  res_name?: string;
  url?: string;
  icon?: string;
  permId?: string;
  subMenus?: MenuItem[];
}