import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { VocabularyListRoutingModule } from './vocabulary-list-routing.module';

import { VocabularyListComponent } from './vocabulary-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    VocabularyListRoutingModule
  ],
  declarations: [VocabularyListComponent],
  exports: [VocabularyListComponent]
})

export class VocabularyListModule {
}
