import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BillsModule } from './bills/bills.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    BillsModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    
    AngularFireModule.initializeApp(
      environment.firebase
    ),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
