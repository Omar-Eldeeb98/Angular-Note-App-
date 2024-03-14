import { authGuard } from './auth.guard';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { NotesComponent } from './pages/notes/notes.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, title: 'Sign-In Page' },
  { path: 'signup', component: SignupComponent, title: 'Sign-Up Page' },
  {
    path: 'notes',
    canActivate: [authGuard],
    component: NotesComponent,
    title: 'Notes Page',
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound Page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
