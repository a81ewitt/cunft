import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { HowToComponent } from './how-to/how-to.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'create', component: CreateComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'how-to', component: HowToComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
