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