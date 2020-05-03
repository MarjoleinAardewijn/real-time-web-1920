/**
 * Method to remove the last child of an element.
 * @param elementId: the ID of the dev that you want to remove the last child from.
 */
const removeLastChild = (elementId) => {
    const div = document.getElementById(elementId);
    div.removeChild(div.lastChild);
},

/**
 * Method to remove all the content inside a div.
 *
 * @param elementId: the ID of the div that you want to clear.
 */
removeAll = (elementId) => {
    const div = document.getElementById(elementId);

    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
};