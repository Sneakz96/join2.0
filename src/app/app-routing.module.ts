import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/main/add-task/add-task.component';
import { BoardComponent } from './components/main/board/board.component';
import { ContactWrapperComponent } from './components/main/contacts/contact-wrapper/contact-wrapper.component';
import { DataProtectionComponent } from 'src/app/components/statics/data-protection/data-protection.component';
import { HelpSectionComponent } from './components/main/help-section/help-section.component';
import { LegalNoticeComponent } from 'src/app/components/statics/legal-notice/legal-notice.component';
import { LoginComponent } from './components/log/login/login.component';
import { SignUpComponent } from './components/log/sign-up/sign-up.component';
import { SummaryComponent } from './components/main/summary/summary.component';
import { WelcomeComponent } from './components/log/welcome/welcome.component';
import { ContentWrapperComponent } from './components/main/content-wrapper/content-wrapper.component';
import { DialogAddUserComponent } from './components/main/dialogs/dialog-add-user/dialog-add-user.component';
import { ContactsComponent } from './components/main/contacts/contacts/contacts.component';
import { EditContactComponent } from './components/main/contacts/edit-contact/edit-contact.component';
import { TaskDialogComponent } from './components/main/dialogs/task-dialog/task-dialog.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'kanbanboard', redirectTo: 'kanbanboard/summary' },
  {
    path: 'kanbanboard', component: ContentWrapperComponent, children: [
      { path: 'summary', component: SummaryComponent },
      {
        path: 'board', component: BoardComponent, children: [
          { path: ':id', component: TaskDialogComponent },
        ]
      },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'help', component: HelpSectionComponent },
      { path: 'data-protection', component: DataProtectionComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
      {
        path: 'contacts', component: ContactWrapperComponent, children: [
          { path: '', component: ContactsComponent },
          { path: 'add-user', component: DialogAddUserComponent },
          { path: 'edit-user/:id', component: EditContactComponent },
        ]
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
