import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { VocabularyListComponent } from './vocabulary-list.component';

const routes: Routes = [
  {
    path: '', component: VocabularyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VocabularyListRoutingModule {
}
