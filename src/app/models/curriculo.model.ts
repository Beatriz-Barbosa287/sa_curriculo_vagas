import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // <-- adicione aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class Curriculos {
  constructor(
    public id: number,
    public usuarioId: number,
    public nome: string,
    public email: string,
    public telefone: string,
    public experiencia: string,
    public formacao: string,
    public habilidades: string,
    public foto?: string
  ) {}

  toMap(): { [key: string]: any } {
    return {
      id: this.id,
      usuarioId: this.usuarioId,
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      experiencia: this.experiencia,
      formacao: this.formacao,
      habilidades: this.habilidades,
      foto: this.foto
    };
  }

  static fromMap(map: any): Curriculos {
    return new Curriculos(
      map.id,
      map.usuarioId,
      map.nome,
      map.email,
      map.telefone,
      map.experiencia,
      map.formacao,
      map.habilidades,
      map.foto
    );
  }
}
