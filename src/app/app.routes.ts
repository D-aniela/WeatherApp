import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add', component: SearchComponent},
    {path: '**', pathMatch: 'full', redirectTo: ''},
];

export const appRouting = RouterModule.forRoot(routes);