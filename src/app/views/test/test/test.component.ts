import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  constructor() { }

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