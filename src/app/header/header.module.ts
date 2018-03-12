import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})

export class HeaderModule {
}
