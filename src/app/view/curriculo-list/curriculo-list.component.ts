import { Component, OnInit } from '@angular/core';
import { Curriculos } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-curriculo-list',
  templateUrl: './curriculo-list.component.html',
  styleUrls: ['./curriculo-list.component.scss']
})
export class CurriculoListComponent implements OnInit {
  public curriculos: Curriculos[] = []; // Lista de currículos
  public curriculo: Curriculos = new Curriculos(0, 0, '', '', '', '', '', '', ''); // Currículo selecionado/para cadastro

  constructor(private _curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculos(); // Carrega os currículos ao iniciar
  }

  listarCurriculos() {
    this._curriculoService.getCurriculos().subscribe((retornoCurriculo) => {
      this.curriculos = retornoCurriculo.map((item) => Curriculos.fromMap(item)); // Preenche a lista
    });
  }

  listarCurriculoUnico(curriculo: Curriculos) {
    this.curriculo = { ...curriculo }; // Faz uma cópia para edição
  }

  cadastrar() {
    this._curriculoService.createCurriculos(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculos(0, 0, '', '', '', '', '', '', ''); // Limpa o formulário após cadastrar
        this.listarCurriculos(); // Atualiza a lista
      },
      (err) => {
        console.error('Erro ao Cadastrar', err);
      }
    );
  }

  atualizar(id: number) {
    this._curriculoService.updateCurriculos(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculos(0, 0, '', '', '', '', '', '', ''); // Limpa o formulário após atualizar
        this.listarCurriculos(); // Atualiza a lista
      },
      (err) => {
        console.log('Erro ao atualizar', err);
      }
    );
  }

  deletar(id: number) {
    this._curriculoService.deleteCurriculos(id).subscribe(
      () => {
        this.listarCurriculos(); // Atualiza a lista após deletar
      },
      (err) => {
        console.error('Erro ao deletar', err);
      }
    );
  }
}
