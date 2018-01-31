import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: Array<MenuItem>;
  currentMenuId: number;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.menus = [
      new MenuItem(1, '主页', 'dashboard'),
      new MenuItem(2, '股票管理', 'stock')
    ];
    this.currentMenuId = 1;
  }

  nav(menu: MenuItem) {
    this.currentMenuId = menu.id;
    this.router.navigateByUrl(menu.path);
  }

}

export class MenuItem {
  constructor(public id: number,
              public name: string,
              public path: string) {
  }
}
