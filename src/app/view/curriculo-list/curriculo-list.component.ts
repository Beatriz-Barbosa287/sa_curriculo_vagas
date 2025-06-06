import { Component, OnInit } from '@angular/core';
import { Curriculos } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-curriculo-list',
  templateUrl: './curriculo-list.component.html',
  styleUrls: ['./curriculo-list.component.scss']
})
export class CurriculoListComponent implements OnInit {
  //atributos
  public curriculos: Curriculos = new Curriculos(0, 0, '', '', '', '', '', '', ''); // rastreia os dados do Formulário
  // vetor para armazenar as info do DB
  public curriculosList: Curriculos[] = [];
   
  constructor(private _curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    this._curriculoService.getCurriculos().subscribe((retornoCurriculo) => {
      this.curriculosList = retornoCurriculo.map((item) => Curriculos.fromMap(item));
    });
  }

  listarCurriculoUnico(curriculo: Curriculos) {
    this.curriculos = curriculo;
  }
//CADASTRO
  cadastrar() {
    this._curriculoService.createCurriculos(this.curriculos).subscribe(
      () => {
        this.curriculos = new Curriculos(0, 0, '', '', '', '', '', '', '');
        this.listarCurriculos();
      },
      (err) => {
        console.error('Erro ao Cadastrar', err);
      }
    );
  }

  //ATUALIZAR
  atualizar(id: number) {
    this._curriculoService.updateCurriculos(this.curriculos).subscribe(
      () => {
        this.curriculos = new Curriculos(0, 0, '', '', '', '', '', '', '');
        this.listarCurriculos();
      },
      (err) => {
        console.log('Erro ao atualizar', err);
      }
    );
  }

  //deletar
  deletar(id: number) {
    this._curriculoService.deleteCurriculos(id).subscribe(
      () => {
        this.listarCurriculos();
      },
      (err) => {
        console.error('Erro ao deletar', err);
      }
    );
  }

  
}
