import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.less'],
})
export class MenusComponent implements OnInit {

  @Input() menus: MenuItem[];
  originMenus: MenuItem[];

  rootNodes: TreeNodeInterface[] = [];
  nodes: TreeNodeInterface[] = [];
  defaultExpandedKeys: string[] = ["1"];

  modalItem: MenuItem;
  isEdit: boolean = false;
  modalTitle: string;
  isVisible: boolean = false;
  validateForm: FormGroup;
  _key: string;
  _pKey: string;

  bizModules: BizModule[] = [
    {
      id: "001",
      name: "用户管理1",
      url: "/sys/user1"
    },
    {
      id: "002",
      name: "角色管理",
      url: "/sys/role"
    },
    {
      id: "003",
      name: "部门管理",
      url: "/sys/dept"
    },
    {
      id: "004",
      name: "用户管理1-1",
      url: "/sys/user1-1"
    },
  ]

  constructor(private modalService: NzModalService, private fb: FormBuilder) { }

  ngOnInit() {
    this.originMenus = [...this.menus];
    // this.nodes = this.convertMenus2Node(this.menus);

    let rootMenus = this.addRoot(this.menus);
    this.rootNodes = this.convertMenus2Node(rootMenus);
    this.nodes = this.rootNodes[0].children;
    this.convertNode2TableData();
    this.initForm();
  }

  addRoot(menus: MenuItem[]) {
    let rootMenus: MenuItem[] = [];
    let root = {
      id: Math.random().toString(),
      name: 'root',
      res_name: '',
      url: '',
      icon: '',
      permId: '',
      subMenus: menus
    }
    rootMenus.push(root);
    return rootMenus;
  }

  initForm() {
    if (!this.isEdit) {
      this.modalTitle = "新增";
      this.validateForm = this.fb.group({
        name: [null, [Validators.required]],
        icon: [null, []],
        url: [null, []],
      });
    } else {
      this.modalTitle = "修改";
      this.validateForm = this.fb.group({
        name: [this.modalItem.name, [Validators.required]],
        icon: [this.modalItem.icon, []],
        url: [this.modalItem.url, []],
      });
    }
  }

  convertMenus2Node(menus: MenuItem[]) {
    let result: TreeNodeInterface[] = []
    menus.forEach(t => {
      let tempItem: TreeNodeInterface = {
        title: t.name,
        name: t.name,
        key: t.id,
        res_name: t.res_name,
        url: t.url,
        icon: t.icon,
        permId: t.permId,
        children: undefined,
      }
      result.push(tempItem)
      if (t.subMenus && t.subMenus.length > 0) {
        tempItem.children = this.convertMenus2Node(t.subMenus)
      }
    })
    return result;
  }

  convertNode2Menus(node: TreeNodeInterface[]) {
    let result: MenuItem[] = []
    node.forEach(t => {
      let tempItem: MenuItem = {
        name: t.name,
        id: t.key,
        res_name: t.res_name,
        url: t.url,
        icon: t.icon,
        permId: t.permId,
        subMenus: undefined,
      }
      result.push(tempItem)
      if (t.children && t.children.length > 0) {
        tempItem.subMenus = this.convertNode2Menus(t.children)
      }
    })
    return result;
  }

  onDrop(event: NzFormatEmitEvent): void {
    let self = event.dragNode.key;
    let parent = event.dragNode.getParentNode()?.key || this.rootNodes[0].key;
    if (parent === this.rootNodes[0].key) {
      let _dragNode = event.dragNode.origin as TreeNodeInterface
      this.rootNodes[0].children.push(_dragNode);
    }
    this.loop(this.rootNodes[0].children, self, parent, this.rootNodes[0].key);
    this.nodes = this.rootNodes[0].children;
    this.refresh();
  }

  loop(allNode: TreeNodeInterface[], self: string, parentKey: string, originParentKey: string) {
    allNode?.forEach?.((item, i) => {
      const { key: k, children } = item;
      if (k === self && originParentKey !== parentKey) {
        allNode.splice(i, 1);
        allNode = allNode?.length ? allNode : undefined;
        return
      }
      if (children) {
        this.loop(children, self, parentKey, k);
      }
    });
  }

  addOrEdit(item: TreeNodeInterface, flag: number) {
    this._key = item.key;
    this._pKey = item.parent?.key;
    if (!flag) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      this.modalItem = this.convertTreeNodeInterface2MenuItem(item);
    }
    this.initForm();
    this.isVisible = true;
  }

  convertTreeNodeInterface2MenuItem(target: TreeNodeInterface) {
    let temp = {};
    temp['id'] = target.key;
    temp['name'] = target.name;
    temp['url'] = target.url;
    temp['icon'] = target.icon;
    temp['res_name'] = target.res_name;
    temp['permId'] = target.permId;
    return temp as MenuItem;
  }

  delNode(item: NzTreeNode) {
    const modal = this.modalService.confirm({
      nzTitle: '删除',
      nzContent: '确定删除当前菜单及其子菜单？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzClosable: false,
      nzOnOk: () => this.loopDel(this.nodes, item.key),
      nzOnCancel: () => modal.destroy()
    });
  }

  loopDel(nodes: TreeNodeInterface[], targetKey: string) {
    nodes.forEach((item, i) => {
      const { key, children } = item;
      if (key === targetKey) {
        nodes.splice(i, 1);
      }
      if (children && children.length) {
        this.loopDel(children, targetKey);
      }
    })
    this.refresh();
  }

  loopAdd(nodes: TreeNodeInterface[], key: string, newItem: TreeNodeInterface) {
    nodes.forEach(item => {
      const { key: k, children } = item;
      if (k === key) {
        if (children) {
          children.push(newItem);
        } else {
          item['children'] = [newItem];
        }
      }
      if (children && children.length) {
        this.loopAdd(children, key, newItem);
      }
    });
  }

  loopEdit(nodes: TreeNodeInterface[], pKey: string, key: string, newItem: TreeNodeInterface) {
    nodes.forEach(item => {
      const { key: k, children } = item;
      if (k === pKey) {
        const _index = children.findIndex(t => t.key === key);
        if (_index >= 0) {
          const target_children = children[_index]['children'] as unknown as TreeNodeInterface[];
          children.splice(_index, 1, { ...newItem, children: target_children });
          return;
        }
      }
      if (children && children.length) {
        this.loopEdit(children, pKey, key, newItem);
      }
    });
  }

  handleCancel() {
    this.validateForm.reset();
    this.isVisible = false;
  }

  handleOk() {
    if (!this.validateForm.valid) {
      return
    }
    const newItem = this.validateForm.value as MenuItem;
    let tempArr: MenuItem[] = [];
    tempArr.push(newItem);
    const nodeArr: TreeNodeInterface[] = this.convertMenus2Node(tempArr);
    if (!this.isEdit) {
      this.loopAdd(this.nodes, this._key, { ...nodeArr[0], key: Math.random().toString() })
    } else {
      this.loopEdit(this.nodes, this._pKey, this._key, { ...nodeArr[0], key: this._key })
    }
    this.refresh();
    this.isVisible = false;
  }

  refresh() {
    this.convertNode2TableData();
    this.nodes = [...this.nodes];
    const newMenus = this.convertNode2Menus(this.nodes);
    this.menus.splice(0, this.menus.length, ...newMenus);
    console.log(this.menus)
  }

  convertNode2TableData() {
    this.nodes.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }

  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: true });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }
    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }
}

export interface TreeNodeInterface {
  key: string;
  name: string;
  title: string,
  children?: TreeNodeInterface[];
  res_name?: string;
  url?: string;
  icon?: string;
  permId?: string;
  level?: number;
  expand?: boolean;
  parent?: TreeNodeInterface;
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

export interface MenuSetting {
  menus: MenuItem[]
}

export interface BizModule {
  id: string;
  name: string;
  group?: string;
  url: string;
}

export interface BizAppConfig {
  bizModules?: BizModule[];
}

