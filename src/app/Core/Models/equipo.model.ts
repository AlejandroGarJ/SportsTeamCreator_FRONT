/* Este fragmento de código define una interfaz denominada `Equipo` en TypeScript. Una interfaz en TypeScript
es una forma de definir la forma de un objeto. En este caso, la interfaz `Equipo` especifica la
estructura de un objeto que representa un equipo. */
export interface Equipo {

    nombre: string,
    id_equipo: number,
    id_club: number,
    categoria: string,
    genero: string,
}