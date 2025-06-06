import { Component, OnInit } from '@angular/core';
import { Curriculos } from '../../models/curriculo.model'; // Adjust the path as needed
import { CurriculoService } from 'src/app/service/curriculo.service';

@Component({
  selector: 'app-curriculo-form',
  templateUrl: './curriculo-form.component.html',
  styleUrls: ['./curriculo-form.component.scss']
})
export class CurriculoFormComponent implements OnInit {
  curriculos: Curriculos = {
    nome: '',
    email: '',
    telefone: '',
    experiencia: '',
    formacao: '', 
    habilidades: '',
  } as Curriculos;

  isEdit: boolean = false;

  constructor(private _curriculosService: CurriculoService) {}

  ngOnInit(): void {
    //editando um currículo existente
    const curriculosId = localStorage.getItem('curriculoId');
    if (curriculosId) {
      this.isEdit = true;
      this._curriculosService.getCurriculoByUsuarioId(Number(curriculosId)).subscribe({
        next: (data) => {
          this.curriculos = data[0]; 
        },
        error: () => alert('Erro ao carregar currículo.')
      });
    } else {
      this.isEdit = false;
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.curriculos.id) {
      this._curriculosService.updateCurriculos(this.curriculos).subscribe({
        next: () => alert('Currículo atualizado com sucesso!'),
        error: () => alert('Erro ao atualizar currículo.')
      });
    } else {
      this._curriculosService.createCurriculos(this.curriculos).subscribe({
        next: () => {
          alert('Currículo enviado com sucesso!');
          this.onReset();
        },
        error: () => alert('Erro ao enviar currículo.')
      });
    }
  }

  onReset(): void {
    // Lógica para resetar o formulário
    this.curriculos = {
      nome: '',
      email: '',
      telefone: '',
      experiencia: '',
      formacao: '',
      habilidades: '',
      foto: '' 
    } as Curriculos;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.curriculos.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
