const TOKEN_TYPE = {
    OPERATION: 1,
    NUMBER: 2,
    SPECIAL: 3,
};
const BUTTONS = (() => {
    let id = 0;
    const operation = (token) => ({
        id: id++,
        value: token,
        type: TOKEN_TYPE.OPERATION
    });
    const number = (digit) => ({
        id: id++,
        value: "" + digit,
        type: TOKEN_TYPE.NUMBER,
    });
    const special = (value) => ({
        id: id++,
        value: value,
        type: TOKEN_TYPE.SPECIAL,
    });
    return {
        SIN: operation("sin"),
        COS: operation("cos"),
        LOG: operation("log"),
        TAN: operation("tan"),
        OPEN: operation("("),
        CLOSE: operation(")"),
        MULT: operation("*"),
        DIV: operation("/"),
        ADD: operation("+"),
        SUB: operation("-"),
        ANS: operation("ANS"),

        _0: number(0),
        _1: number(1),
        _2: number(2),
        _3: number(3),
        _4: number(4),
        _5: number(5),
        _6: number(6),
        _7: number(7),
        _8: number(8),
        _9: number(9),
        DOT: number("."),

        DEL: special("DEL"),
        ALL_CLEAR: special("AC"),
        EQUAL: special("="),
    };
})();
let calculations = [];
const Calculator = {
    data() {
        return {
            buttons: BUTTONS,
            calculations: calculations,
            tokens: [],
            input: "",
        }
    },
    methods: {
        tokenClicked(button) {
            this.tokens.push({
                type: button.type,
                value: button.value,
            });
        },
        specialClicked(button) {
            switch (button.id) {
                case BUTTONS.DEL.id:
                    const lastToken = this.tokens[this.tokens.length - 1];
                    if (lastToken !== undefined) {
                        if (lastToken.type === TOKEN_TYPE.OPERATION) {
                            this.tokens.pop();
                        } else {
                            lastToken.value = lastToken.value.substring(0, lastToken.value.length - 1);
                        }
                    }
                    break;
                case BUTTONS.ALL_CLEAR.id:
                    this.tokens = [];
                    this.calculations = [];
                    break;
                case BUTTONS.EQUAL.id:
                    if (this.tokens.length == 0) {
                        if (calculations.length == 0) {
                            break;
                        }
                        const calculation = calculations[calculations.length - 1];
                        this.tokens = calculation.tokens;
                        this.input = calculation.input;
                    }
                    this.calculations.push({
                        tokens: this.tokens,
                        input: this.input,
                        result: evalTokens(this.tokens),
                    });
                    this.tokens = [];
                    break;
            }
        },
        numberClicked(button) {
            let current = this.tokens[this.tokens.length - 1] ?? {};
            if (current.type === TOKEN_TYPE.NUMBER) {
                if (button.id == BUTTONS.DOT.id) {
                    if (!current.value.includes(BUTTONS.DOT.value)) {
                        current.value += button.value;
                    }
                } else {
                    current.value += button.value;
                }
            } else {
                this.tokens.push({
                    type: button.type,
                    value: button.value,
                });
            }
        },
        buttonClicked(button) {
            switch (button.type) {
                case TOKEN_TYPE.OPERATION:
                    this.tokenClicked(button);
                    break;
                case TOKEN_TYPE.NUMBER:
                    this.numberClicked(button);
                    break;
                case TOKEN_TYPE.SPECIAL:
                    this.specialClicked(button);
                    break;
                default: throw new Error("unknown button type");
            }

            this.input = this.tokens.map(x => x.value).join(" ");
        }
    }
};

function getOrThrow(array, index, errMsg) {
    const value = array[index];
    if (value === undefined) {
        throw new Error(errMsg);
    }
    return value;
}

function ans() {
    const calculation = calculations[calculations.length - 1];
    if (calculation === undefined) {
        throw new Error("No previous calculation.");
    }
    const result = calculation.result;
    if (result instanceof Error) {
        throw new Error("Previous calculation invalid.");
    }
    return result;
}

function operationToJS(tokens, index) {
    let nextValue = () => tokensToJS([getOrThrow(tokens, index + 1, "Argument must be provided")]);
    switch (tokens[index].value) {
        case BUTTONS.SIN.value: return [1, `Math.sin(${nextValue()})`];
        case BUTTONS.COS: return [1, `Math.cos(${nextValue()})`];
        case BUTTONS.LOG: return [1, `Math.log(${nextValue()})`];
        case BUTTONS.TAN.value: return [1, `Math.tan(${nextValue()})`];
        case BUTTONS.OPEN.value: return [0, `(`];
        case BUTTONS.CLOSE.value: return [0, `)`];
        case BUTTONS.MULT.value: return [0, '*'];
        case BUTTONS.DIV.value: return [0, '/'];
        case BUTTONS.ADD.value: return [0, '+'];
        case BUTTONS.SUB.value: return [0, '-'];
        case BUTTONS.ANS.value: return [0, ans()];
    }
}

function tokensToJS(tokens) {
    let jsTokens = new Array(tokens.length);
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === TOKEN_TYPE.OPERATION) {
            const [skip, js] = operationToJS(tokens, i);
            jsTokens[i] = js;
            i += skip;
        } else {
            jsTokens[i] = token.value;
        }
    }
    return jsTokens.join("");
}

function evalTokens(tokens) {
    let result;
    try {
        const js = tokensToJS(tokens);
        console.log("CALCULATING: " + js);
        result = eval(js);
    } catch (e) {
        console.error(e);
        result = e;
    }
    return result;
}

Vue.createApp(Calculator).mount(".calculator");