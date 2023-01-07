import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { BoardComponent } from './components/board/board.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { HelpSectionComponent } from './components/help-section/help-section.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { LoggedWrapperComponent } from './components/logged-wrapper/logged-wrapper.component';
import { LoginComponent } from './services/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DialogAddUserComponent } from './services/dialog-add-user/dialog-add-user.component';
import { ContactWrapperComponent } from './components/contact-wrapper/contact-wrapper.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';


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
    LoginComponent,
    LoggedWrapperComponent,
    HelpSectionComponent,
    DialogAddUserComponent,
    ContactWrapperComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
