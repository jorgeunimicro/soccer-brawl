import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { ToastService } from './shared/toast.service';
import { ProfileComponent } from './auth/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NoAuthGuard } from './shared/no-auth.guard';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { TeamsComponent } from './admin/teams/teams.component';
import { AdminGuard } from './shared/admin.guard';
import { TeamsService } from './admin/teams/teams.service';
import { DeleteDialogComponent } from './admin/delete-dialog/delete-dialog.component';
import { GroupsComponent } from './admin/groups/groups.component';
import { GroupsService } from './admin/groups/groups.service';
import { GetGroupNamePipe } from './admin/teams/get-group-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    ResetPasswordComponent,
    TeamsComponent,
    DeleteDialogComponent,
    GroupsComponent,
    GetGroupNamePipe
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true }),
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, ToastService, AuthGuard, NoAuthGuard, AdminGuard, TeamsService, GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
