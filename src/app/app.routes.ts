import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/auth.guard';
import { NoAuthGuard } from './shared/no-auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TeamsComponent } from './teams/teams.component';
import { AdminGuard } from './shared/admin.guard';
import { GroupsComponent } from './groups/groups.component';

export const appRoutes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent,  canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent,  canActivate: [NoAuthGuard] },
  { path: 'reset', component: ResetPasswordComponent, canActivate: [NoAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/teams', component: TeamsComponent, canActivate: [AdminGuard] },
  { path: 'admin/groups', component: GroupsComponent, canActivate: [AdminGuard] },
  { path: '',
    redirectTo: '/profile',
    pathMatch: 'full'
  },
];
