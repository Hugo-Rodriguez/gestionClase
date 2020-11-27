// helpers

const hbs = require('hbs');

let nombrePie = "Rocio / Manuel / Hugo";


hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('nombreCompleto', () => {
    return nombrePie;
});
hbs.registerHelper('nombrePie', () => {
    return nombrePie ;
});

hbs.registerHelper('capitalizar', ( texto )  => {
    
    let palabras = texto.split(' ');
    palabras.forEach( (palabra , idx ) => { 
        palabras[idx] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
        
    });

    return palabras.join(' ');

} );