const operators = {};

function registerOperator(operator) {
    operators[operator.token] = operator;
}

function registerBinaryOperator(token, func) {
    registerOperator(new BinaryOperator(token, func));
}

registerBinaryOperator('^', (lhs, rhs) => Math.pow(lhs, rhs));
registerBinaryOperator('*', (lhs, rhs) => lhs * rhs);
registerBinaryOperator('/', (lhs, rhs) => lhs / rhs);
registerBinaryOperator('+', (lhs, rhs) => lhs + rhs);
registerBinaryOperator('-', (lhs, rhs) => lhs - rhs);

class Operator {
    constructor(token) {
        this.token = token;
    }

    calculate(tokens, tokenIndex) {
        throw new Error("not implemented");
    }
}

class BinaryOperator extends Operator {
    constructor(token, func) {
        super(token);
        this.func = func;
    }

    calculate(tokens, tokenIndex) {
        const lhs = tokens[tokenIndex - 1];
        const rhs = tokens[tokenIndex + 1];
        if (lhs === undefined) {
            throw new Error(`The '${this.token}' operator is missing a left-hand side operand`);
        }
        if (rhs === undefined) {
            throw new Error(`The '${this.token}' operator is missing a right-hand side operand`);
        }
        return this.func(lhs, rhs);
    }
}

function isNumberChar(char) {
    if (!char) {
        return false;
    }
    const code = char.charCodeAt(0);
    return (
        code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0) ||
        code == ','
    );
}

function isWhitespace(char) {
    const chars = new Set([' ', '\t', '\r', '\n', '\v', '\f']);
    if (!char) {
        return false;
    }
    return chars.has(char);
}

function nextCharIndex(str, start) {
    for (let i = start; i < str.length; i++) {
        if (!isWhitespace(str[i])) {
            return i;
        }
    }
    return str.length;
}

function tokenize(str) {
    let tokens = [];
    let token = "";
    for (let i = 0; i < str.length;) {
        const c = str[i];
        const isNumber = isNumberChar(str[i]);
        const next = nextCharIndex(str, i + 1);
        token += str[i];
        if (isNumber != isNumberChar(str[next])) {
            tokens.push(isNumber ? parseFloat(token) : token);
            token = "";
        }
        i = next;
    }
    return tokens;
}

function parse(str) {
    const tokens = tokenize(str);
}