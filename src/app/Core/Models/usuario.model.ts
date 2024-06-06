/**
* El código TypeScript anterior define un tipo `Usuario` con propiedades para la información personal de un usuario
* y lo inicializa con valores vacíos.
* @property {string} dni - La propiedad "dni" en el tipo Usuario representa el DNI (Documento
* Nacional de Identidad) de un usuario, que es un número de identificación único utilizado en algunos países.
* @property {string} nombre - La propiedad "nombre" en el tipo Usuario representa el nombre de pila de un
* usuario. Es un campo de tipo cadena donde normalmente se almacenaría el nombre de pila o el nombre de pila del usuario.
* @property {string} apellidos - La propiedad "apellidos" en el tipo Usuario representa el apellido
* de un usuario. Es un campo de tipo cadena que almacena el apellido del usuario.
* @property {string} correo - La propiedad "correo" en el tipo Usuario representa la dirección de correo electrónico
* de un usuario. Es un campo de tipo cadena donde se almacenará la dirección de correo electrónico del usuario.
* @property {string} imagen - La propiedad "imagen" en el tipo Usuario representa la imagen
* asociada al usuario. Es un tipo de cadena que normalmente almacena la URL o ruta a la foto de perfil o avatar del
* usuario.
*/
export type Usuario = {
    dni: string;
    nombre: string;
    apellidos: string,
    correo: string,
    imagen: string
}


export const UsuarioInit: Usuario = { dni: "", nombre: "", apellidos: "", correo: "", imagen: "" };