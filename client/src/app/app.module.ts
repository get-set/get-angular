import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {ContentComponent} from './content/content.component';
import {StockManageComponent} from './stock/stock-manage/stock-manage.component';
import {StarsComponent} from './stock/stars/stars.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StockFormComponent} from './stock/stock-form/stock-form.component';
import {StockService} from './stock/stock.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StockFilterPipe} from './stock/stock-filter.pipe';
import {WebsocketService} from './stock/websocket.service';
import {HttpClientJsonpModule, HttpClientModule, JsonpClientBackend} from '@angular/common/http';

const routeConfig: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'stock', component: StockManageComponent},
  {path: 'stock/:id', component: StockFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    StockManageComponent,
    StarsComponent,
    DashboardComponent,
    StockFormComponent,
    StockFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [StockService, JsonpClientBackend, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
