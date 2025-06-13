import { Component, OnInit } from '@angular/core';
import { Vaga } from 'src/app/models/vaga.model';
import { VagaService } from 'src/app/service/vaga.service';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.scss']
})
export class VagasComponent implements OnInit{
  // Vetor para armazenar as vagas retornadas da API
  public vagas: Vaga[] =[];

  // Injetando o serviço de vagas no construtor do componente
  constructor (private _vagasService : VagaService){}

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    this.listarVagas();
  }

  // Busca todas as vagas no serviço e popula o array de vagas
  listarVagas(){
    this._vagasService.getVagas().subscribe(
      (retornaVaga) => {
        // Mapeia os dados da API para instâncias do modelo Vaga
        this.vagas = retornaVaga.map(
          (item) => 
            Vaga.fromMap(item)
        );
      }
    );
  }
}