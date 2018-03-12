import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ForgotPasswordRoutingModule
  ],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent]
})

export class ForgotPasswordModule {
}
