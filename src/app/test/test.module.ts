import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { TestRoutingModule } from './test-routing.module';

import { TestComponent } from './test.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    TestRoutingModule
  ],
  declarations: [TestComponent],
  exports: [TestComponent]
})

export class TestModule {
}
