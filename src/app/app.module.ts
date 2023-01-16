import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from "@angular/fire/firestore";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { BoardComponent } from './components/board/board.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { HelpSectionComponent } from './components/help-section/help-section.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { LoggedWrapperComponent } from './components/logged-wrapper/logged-wrapper.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DialogAddUserComponent } from './components/dialogs/dialog-add-user/dialog-add-user.component';
import { ContactWrapperComponent } from './components/contact-wrapper/contact-wrapper.component';
import { DialogGuestLoginComponent } from './components/dialogs/dialog-guest-login/dialog-guest-login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LegalNoticeComponent,
    AddTaskComponent,
    SummaryComponent,
    BoardComponent,
    DataProtectionComponent,
    ContactsComponent,
    LoggedWrapperComponent,
    HelpSectionComponent,
    DialogAddUserComponent,
    ContactWrapperComponent,
    ContactListComponent,
    DialogGuestLoginComponent,
    SignUpComponent,
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    FirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' }
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
