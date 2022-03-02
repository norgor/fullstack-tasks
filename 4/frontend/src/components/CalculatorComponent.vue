<template>
  <div class="calculator-container">
    <div class="calculator">
      <div class="input">
        <p v-for="(calculation, index) in calculations" :key="index">
          {{ calculation.input }} = {{ calculation.result }}
        </p>
        {{ input }}
      </div>
      <div class="buttons">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          v-on:click="buttonClicked(button)"
        >
          {{ button.value }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { calculate } from "@/services/CalculatorService.js";

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
    type: TOKEN_TYPE.OPERATION,
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
export default {
  name: "calculator-item",
  data() {
    return {
      buttons: BUTTONS,
      calculations: [],
      tokens: [],
      input: "",
    };
  },
  methods: {
    tokenClicked(button) {
      this.tokens.push({
        type: button.type,
        value: button.value,
      });
    },
    async specialClicked(button) {
      switch (button.id) {
        case BUTTONS.DEL.id:
          {
            const lastToken = this.tokens[this.tokens.length - 1];
            if (lastToken === undefined) break;
            if (lastToken.type === TOKEN_TYPE.OPERATION) {
              this.tokens.pop();
            } else {
              lastToken.value = lastToken.value.substring(
                0,
                lastToken.value.length - 1
              );
              if (lastToken.value.length === 0) {
                this.tokens.pop();
              }
            }
          }
          break;
        case BUTTONS.ALL_CLEAR.id:
          this.tokens = [];
          this.calculations = [];
          this.input = "";
          break;
        case BUTTONS.EQUAL.id:
          if (this.tokens.length == 0) {
            break;
          }
          this.calculations.push({
            tokens: this.tokens,
            input: this.input,
            result: await evalTokens(this.tokens),
          });
          this.tokens = [];
          this.input = "";
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
        default:
          throw new Error("unknown button type");
      }

      this.input = this.tokens.map((x) => x.value).join(" ");
    },
  },
};

async function evalTokens(tokens) {
  let apiResult = await calculate(tokens.map(x => x.value));
  console.log(apiResult);
  let result;
  if (!apiResult.error) {
    result = apiResult.value;
  } else {
    console.error(apiResult.error);
    result = apiResult.error;
  }
  return result;
}
</script>

<style scoped>
.calculator-container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 3fr 1fr;
  height: 80%;
}

.calculator {
  grid-row: 1;
  grid-column: 2;
  background-color: #ddd;
  border-radius: 40px;
  display: grid;
  padding: 40px;
  grid-template-rows: auto max-content;
  grid-template-columns: none;
  row-gap: 8px;
}

.calculator > .input {
  word-wrap: normal;
  font-size: 20px;
  padding: 16px;
  background-color: #333;
  color: white;
  scroll-behavior: smooth;
  overflow-y: scroll;
  min-height: 0px;
  max-height: 100%;
}

.calculator > .input,
.calculator > .input * {
  word-break: break-all;
}

.calculator > .buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  row-gap: 5px;
  column-gap: 5px;
}

.calculator > .buttons > button {
  background-color: grey;
  color: white;
  font-size: 16px;
  padding: 6px;
  border: 0;
  border-radius: 8px;
}

.calculator > .buttons > button:hover {
  background-color: rgb(95, 78, 243);
}

:root {
  --calc-width: 600px;
}

@media only screen and (max-width: 600px) {
  .calculator-container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 0fr 3fr 0fr;
  }
}
</style>