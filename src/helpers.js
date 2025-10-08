// /**
//  * Створює елемент, додає клас(и) і приєднує до батьківського елемента.
//  * @param {string} tag - Назва тегу ('div', 'input', 'button' тощо).
//  * @param {string | string[]} [className] - Клас або масив класів.
//  * @param {HTMLElement} [parent] - Батьківський елемент для додавання.
//  * @returns {HTMLElement} Створений елемент.
//  */
export function createElementWithClass(
    tag,
    className,
    parent,
    attributes = null
) {
    const element = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            element.classList.add(...className);
        } else {
            element.classList.add(className);
        }
    }
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    if (parent) {
        parent.append(element);
    }
    return element;
}
