const tokens = new Set();
const operators = new Map();

function registerTokens(toks) {
    toks.forEach((x) => tokens.add(x));
}

function registerOperators(ops) {
    registerTokens(ops.map(x => x.token));
    ops.forEach(x => operators.set(x.token, x));
}

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

function nextCharIndex(str, startIndex) {
    for (let i = startIndex; i < str.length; i++) {
        if (!isWhitespace(str[i])) {
            return i;
        }
    }
    return str.length;
}

function lookupToken(str, startIndex) {
    for (let token of tokens.keys()) {
        console.log(token);
        if (str.substring(startIndex, startIndex + token.length) == token) {
            return startIndex + token.length;
        }
    }
    return -1;
}

function tokenize(str) {
    let tokens = [];
    let token = "";
    for (let i = 0; i < str.length;) {
        const isNumber = isNumberChar(str[i]);
        let next;
        if (!isNumber) {
            next = lookupToken(str, i);
            if (next == -1) {
                throw new Error(`Could not find token matching from column ${i}: ${str.substring(i)} `);
            }
        } else {
            next = nextCharIndex(str, i + 1);
        }
        token += str.substring(i, next);
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
registerTokens(['(', ')']);
registerOperators([
    new BinaryOperator('^', Math.pow),
    new BinaryOperator('*', (lhs, rhs) => lhs * rhs),
    new BinaryOperator('/', (lhs, rhs) => lhs / rhs),
    new BinaryOperator('+', (lhs, rhs) => lhs + rhs),
    new BinaryOperator('-', (lhs, rhs) => lhs - rhs),
]);