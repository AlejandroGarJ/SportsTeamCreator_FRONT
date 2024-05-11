export type Usuario = {
    dni: string;
    nombre: string;
    apellidos: string,
    correo: string,
    imagen: string
}


export const UsuarioInit: Usuario = { dni: "", nombre: "", apellidos: "", correo: "", imagen: "" };