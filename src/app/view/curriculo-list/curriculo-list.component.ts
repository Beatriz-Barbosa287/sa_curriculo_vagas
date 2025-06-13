import { Component, OnInit } from '@angular/core';
import { Curriculos } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-curriculo-list',
  templateUrl: './curriculo-list.component.html',
  styleUrls: ['./curriculo-list.component.scss']
})
export class CurriculoListComponent implements OnInit {
  public curriculos: Curriculos[] = [];
  public curriculo: Curriculos = new Curriculos(0, 0, '', '', '', '', '', '', '');

  constructor(private _curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos() {
    this._curriculoService.getCurriculos().subscribe((retornoCurriculo) => {
      this.curriculos = retornoCurriculo.map((item) => Curriculos.fromMap(item));
    });
  }

  listarCurriculoUnico(curriculo: Curriculos) {
    this.curriculo = curriculo;
  }

  cadastrar() {
    this._curriculoService.createCurriculos(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculos(0, 0, '', '', '', '', '', '', '');
        this.listarCurriculos();
      },
      (err) => {
        console.error('Erro ao Cadastrar', err);
      }
    );
  }

  atualizar(id: number) {
    this._curriculoService.updateCurriculos(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculos(0, 0, '', '', '', '', '', '', '');
        this.listarCurriculos();
      },
      (err) => {
        console.log('Erro ao atualizar', err);
      }
    );
  }

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
