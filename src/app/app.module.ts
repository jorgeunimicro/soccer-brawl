import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { ToastService } from './shared/toast.service';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NoAuthGuard } from './shared/no-auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TeamsComponent } from './teams/teams.component';
import { AdminGuard } from './shared/admin.guard';
import { TeamsService } from './teams/teams.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupsService } from './groups/groups.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    ResetPasswordComponent,
    TeamsComponent,
    DeleteDialogComponent,
    GroupsComponent
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
