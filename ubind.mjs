/**
 * μBind v0.0.1
 * Author: norgor
 */
const BINDING_REGEX = /(?<!\\){[\w\d_]+}/g;

class PropBind {
    constructor(name, startIndex, endIndex) {
        this.name = name;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
}

function findPropBinds(text) {
    const bindProps = [];
    let match;
    while ((match = BINDING_REGEX.exec(text)) !== null) {
        const propName = text.substring(match.index + 1, match.index + match[0].length - 1);
        const start = match.index;
        const end = match.index + match[0].length;
        bindProps.push(new PropBind(propName, start, end));
    }
    return bindProps;
}

/**
 * Binds to a specific attribute
 * @param {HTMLElement} element Element which to bind to
 * @param {Object} properties Object containing properties which will be used for binding.
 * @returns 
 */
export function uBind(element, props) {
    const text = element.innerText;
    const propBinds = findPropBinds(text);
    if (propBinds.length == 0) {
        return;
    }

    const texts = new Array(1 + propBinds.length * 2);
    function updateText() {
        element.innerText = texts.join("");
    }

    texts[0] = text.substring(0, propBinds[0].startIndex);

    for (let i = 0; i < propBinds.length; i++) {
        const propBind = propBinds[i];
        const idx = (i * 2) + 1;
        const textAfterBind = text.substring(
            propBind.endIndex,
            (propBinds[i + 1] ?? {}).startIndex,
        );
        texts[idx] = props[propBind.name];
        texts[idx + 1] = textAfterBind;

        Object.defineProperty(props, propBind.name, {
            get: () => texts[idx],
            set: (newValue) => {
                texts[idx] = newValue;
                updateText();
            },
        });
    }

    updateText();
}

/**
 * Binds to all elements with the u-bind attribute.
 * @param {Object} properties Object containing properties which will be used for binding.
 */
export function uBindAll(properties) {
    const bindable = document.querySelectorAll("[u-bind]");
    bindable.forEach(x => uBind(x, properties));
}