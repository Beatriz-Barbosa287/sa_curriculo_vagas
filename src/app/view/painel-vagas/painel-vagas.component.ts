import { Component, OnInit } from '@angular/core';
import { Vaga } from 'src/app/models/vaga.model';
import { VagaService } from 'src/app/service/vaga.service';

@Component({
  selector: 'app-painel-vagas',
  templateUrl: './painel-vagas.component.html',
  styleUrls: ['./painel-vagas.component.scss'],
})
export class PainelVagasComponent implements OnInit {
  //atributos
  public vaga: Vaga = new Vaga(0, '', '', '', 0); //rastreas os dados do Formulário
  // vetor para armazenar as info do DB
  public vagas: Vaga[] = [];

  constructor(private _vagasService: VagaService) { } //servico é criado ao ser construido o obj

  ngOnInit(): void {
    this.listarVagas();
  }

  //colocr as vagas na TAbela
  listarVagas() {
    this._vagasService.getVagas().subscribe((retornoVaga) => {
      this.vagas = retornoVaga.map((item) => Vaga.fromMap(item));
    });
  }

  // listar Vaga Unica
  listarVagaUnica(vaga: Vaga) {
    this.vaga = new Vaga(vaga.id, vaga.nome, vaga.foto, vaga.descricao, vaga.salario); // cópia dos dados para edição
  }

  //cadastrar nova Vaga com validação
  cadastrar() {
    if (
      !this.vaga.id ||
      !this.vaga.nome ||
      !this.vaga.foto ||
      !this.vaga.descricao ||
      !this.vaga.salario
    ) {
      alert('Preencha todos os campos obrigatórios antes de cadastrar a vaga!');
      return;
    }

    this._vagasService.cadastrarVaga(this.vaga).subscribe(
      () => {
        alert('Vaga cadastrada com sucesso!');
        this.vaga = new Vaga(0, '', '', '', 0);
        this.listarVagas();
      },
      (err) => {
        console.error('Erro ao Cadastrar', err);
      }
    );
  }

  // atualizar Vaga com validação
  atualizar(id: number) {
    if (
      !this.vaga.id ||
      !this.vaga.nome ||
      !this.vaga.foto ||
      !this.vaga.descricao ||
      !this.vaga.salario
    ) {
      alert('Preencha todos os campos obrigatórios antes de atualizar a vaga!');
      return;
    }

    this._vagasService.atualizarVaga(id, this.vaga).subscribe(
      () => {
        alert('Vaga atualizada com sucesso!');
        this.vaga = new Vaga(0, '', '', '', 0);
        this.listarVagas();
      },
      (err) => {
        console.log('Erro ao atualizar', err);
      }
    );
  }

  //deletar vaga
  excluir(id: number) {
    this._vagasService.removerVaga(id).subscribe(
      () => {
        this.listarVagas();
        this.vaga = new Vaga(0, '', '', '', 0);
      },
      (err) => {
        console.log('Erro ao Deletar', err);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.vaga.foto = file.name; // para  mostrar a imagem salve como base 64
    }
  }
}
