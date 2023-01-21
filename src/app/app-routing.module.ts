import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { BoardComponent } from './components/board/board.component';
import { ContactWrapperComponent } from './components/contact-wrapper/contact-wrapper.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { HelpSectionComponent } from './components/help-section/help-section.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SummaryComponent } from './components/summary/summary.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { DialogAddUserComponent } from './components/dialogs/dialog-add-user/dialog-add-user.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'kanbanboard', component: ContentWrapperComponent, children: [
      { path: 'summary', component: SummaryComponent },
      { path: 'board', component: BoardComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'help', component: HelpSectionComponent },
      { path: 'data-protection', component: DataProtectionComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
      { path: 'contacts', component: ContactWrapperComponent, children:[
        { path: '', component: ContactsComponent  },
         { path: 'add-user', component: DialogAddUserComponent  },
        //  { path: 'edit-user:id', component: },
      ] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
