import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
    {path: '', component: ListComponent},
    {path: 'add', component: AddComponent},
    {path: 'list', component: ListComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: 'visualization/:id', component: VisualizationComponent},
    {path:'**',component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }