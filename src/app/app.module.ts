//ANGULAR_
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//ROUTER_
import { AppRoutingModule } from './app-routing.module';

//COMPONENTS_
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
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DialogAddTaskComponent } from './components/dialogs/dialog-add-task/dialog-add-task.component';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

//ANGULAR_MATERIAL_
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

//ANGULAR_FIRE_
import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule, provideFirestore, getFirestore } from "@angular/fire/firestore";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from './components/dialogs/task-dialog/task-dialog.component';
import { initializeApp, getApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import { DialogEditUserComponent } from './components/dialogs/dialog-edit-user/dialog-edit-user.component';


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
  ],
  imports: [
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
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    MatDatepickerModule,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' }
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
