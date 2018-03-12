import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VerifyRoutingModule } from './verify-routing.module';

import { VerifyComponent } from './verify.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VerifyRoutingModule
  ],
  declarations: [VerifyComponent],
  exports: [VerifyComponent]
})
export class VerifyModule {
}
