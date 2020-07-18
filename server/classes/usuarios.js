class Usuarios {

    constructor() {
        this.personas = []; //listado de personas/usuarios
    };

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.getPersonasPorSala(sala);
    };

    getPersona(id) {
        let persona = this.personas.filter(pers => pers.id === id)[0];
        return persona;
    };

    getPersonas() {
        return this.personas;
    };

    getPersonasPorSala(sala) {
        let personas = this.personas.filter(pers => pers.sala === sala);
        return personas;
    };

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(pers => pers.id != id);
        return personaBorrada;
    };

};

module.exports = {
    Usuarios
}