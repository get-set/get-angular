import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  pageTitle = '首页';
  pageDesc = '这里是首页';

  constructor(public router: Router) {
    router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if ('/dashboard' === event.url) {
          this.pageTitle = '首页';
          this.pageDesc = '这里是首页';
        } else if ('/stock' === event.url) {
          this.pageTitle = '股票管理';
          this.pageDesc = '股票管理界面 - 增删改查';
        }
      });
  }

  ngOnInit() {
  }

}
