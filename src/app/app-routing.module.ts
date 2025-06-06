import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './view/inicio/inicio.component';
import { VagasComponent } from './view/vagas/vagas.component';
import { PainelVagasComponent } from './view/painel-vagas/painel-vagas.component';
import { CurriculoFormComponent } from './view/curriculo-form/curriculo-form.component';

const routes: Routes = [
  {path: "", component: InicioComponent},
  {path: "vagas", component: VagasComponent},
  {path: "painel-vagas", component: PainelVagasComponent},

  {path: "curriculo-form", component: CurriculoFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

