import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

import { SignUpRoutingModule } from './sign-up-routing.module';

import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    SignUpRoutingModule
  ],
  declarations: [SignUpComponent],
  exports: [SignUpComponent]
})

export class SignUpModule {
}
