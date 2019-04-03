import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { CompanyModule } from './company/company.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    DashboardModule,
    CompanyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
