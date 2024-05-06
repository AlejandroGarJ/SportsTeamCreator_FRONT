export type Usuario = {
    dni: string;
    nombre: string;
    apellidos: string,
    correo: string
}


export const UsuarioInit: Usuario = { dni: "", nombre: "", apellidos: "", correo: "" };