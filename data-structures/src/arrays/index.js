/**
 * Arrays in JavaScript
 * 
 * Este archivo contiene funciones útiles para trabajar con arrays en JavaScript.
 */

const ArrayUtils = {
    addElement(array, element) {
        array.push(element);
        return array;
    },

    removeElement(array, element) {
        const index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    },

    getLength(array) {
        return array.length;
    }
};

/**
 * Encuentra un elemento en el array y devuelve su índice
 * @param {Array} array - El array donde buscar
 * @param {*} element - El elemento a buscar
 * @returns {number} El índice del elemento o -1 si no se encuentra
 */
export const findElement = (array, element) => {
  const index = array.indexOf(element);
  return index;
};

/**
 * Filtra elementos de un array según un predicado
 * @param {Array} array - El array a filtrar
 * @param {Function} predicate - Función que define la condición de filtrado
 * @returns {Array} Nuevo array con los elementos que cumplen la condición
 */
export const filterArray = (array, predicate) => {
  return array.filter(predicate);
};

/**
 * Mapea los elementos de un array aplicando una transformación
 * @param {Array} array - El array original
 * @param {Function} transform - Función que transforma cada elemento
 * @returns {Array} Nuevo array con los elementos transformados
 */
export const mapArray = (array, transform) => {
  return array.map(transform);
};

/**
 * Reduce un array a un único valor
 * @param {Array} array - El array a reducir
 * @param {Function} reducer - Función reductora
 * @param {*} initialValue - Valor inicial
 * @returns {*} Valor resultante
 */
export const reduceArray = (array, reducer, initialValue) => {
  return array.reduce(reducer, initialValue);
};

/**
 * Elimina duplicados de un array
 * @param {Array} array - El array con posibles duplicados
 * @returns {Array} Nuevo array sin duplicados
 */
export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

export default ArrayUtils;