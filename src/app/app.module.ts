import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';

import { DialogModule } from './dialog/dialog.module';
import { HeaderModule } from './header/header.module';

import {
  VocabularyService,
  AuthService,
  TestService,
  UserService
} from './services';
import { AuthGuard } from './guards';
import { MyHttpInterceptor } from './my-http-interceptor';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    DialogModule,
    HeaderModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
    AuthGuard,
    VocabularyService,
    AuthService,
    TestService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
