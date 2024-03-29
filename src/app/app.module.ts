// ANGULAR_
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ROUTER_
import { AppRoutingModule } from './app-routing.module';
// COMPONENTS_
import { AppComponent } from './app.component';
// MAIN
import { AddTaskComponent } from './components/main/add-task/add-task.component';
import { BoardComponent } from './components/main/board/board.component';
import { ContactsComponent } from './components/main/contacts/contacts/contacts.component';
import { SummaryComponent } from './components/main/summary/summary.component';
import { LoggedWrapperComponent } from './components/main/logged-wrapper/logged-wrapper.component';
import { SidenavComponent } from './components/main/sidenav/sidenav.component';
import { HelpSectionComponent } from './components/statics/help-section/help-section.component';
import { ContactWrapperComponent } from './components/main/contacts/contact-wrapper/contact-wrapper.component';
import { ContactListComponent } from './components/main/contacts/contact-list/contact-list.component';
import { EditContactComponent } from './components/main/contacts/edit-contact/edit-contact.component';
import { ContentWrapperComponent } from './components/main/content-wrapper/content-wrapper.component';
import { TaskDialogComponent } from './components/main/dialogs/task-dialog/task-dialog.component';
// LEGAL_NOTICES
import { LegalNoticeComponent } from 'src/app/components/statics/legal-notice/legal-notice.component';
import { DataProtectionComponent } from 'src/app/components/statics/data-protection/data-protection.component';
// DIALOGS
import { DialogAddUserComponent } from './components/main/dialogs/dialog-add-user/dialog-add-user.component';
import { DialogAddTaskComponent } from './components/main/dialogs/dialog-add-task/dialog-add-task.component';
import { DialogEditUserComponent } from './components/main/dialogs/dialog-edit-user/dialog-edit-user.component';
import { DialogEditTaskComponent } from './components/main/dialogs/dialog-edit-task/dialog-edit-task.component';
// LOG_SIGN
import { SignUpComponent } from './components/log/sign-up/sign-up.component';
import { LoginComponent } from './components/log/login/login.component';
import { WelcomeComponent } from './components/log/welcome/welcome.component';
// ANGULAR_MATERIAL_
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// ANGULAR_FIRE_
import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule, provideFirestore, getFirestore } from "@angular/fire/firestore";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';

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
    SignUpComponent,
    LoginComponent,
    WelcomeComponent,
    TaskDialogComponent,
    DialogAddTaskComponent,
    ContentWrapperComponent,
    EditContactComponent,
    DialogEditUserComponent,
    DialogEditTaskComponent,
  ],
  imports: [
    MatCheckboxModule,
    HttpClientModule,
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
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    TaskDialogComponent,
    MatDatepickerModule,
    EditContactComponent,
    LoginComponent,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' }
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
