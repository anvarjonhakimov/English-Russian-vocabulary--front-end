import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'words-list',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: './sign-in/sign-in.module#SignInModule'
  },
  {
    path: 'sign-up',
    loadChildren: './sign-up/sign-up.module#SignUpModule'
  },
  {
    path: 'verify-email/:activationCode',
    loadChildren: './verify/verify.module#VerifyModule'
  },
  {
    path: 'words-list',
    loadChildren: './vocabulary-list/vocabulary-list.module#VocabularyListModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'test',
    loadChildren: './test/test.module#TestModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'reset-password/:username/:recoveryCode',
    loadChildren: './reset-password/reset-password.module#ResetPasswordModule'
  }
];
