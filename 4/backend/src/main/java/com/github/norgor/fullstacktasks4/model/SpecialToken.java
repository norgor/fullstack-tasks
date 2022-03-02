package com.github.norgor.fullstacktasks4.model;

public enum SpecialToken {
    SIN("sin"),
    COS("cos"),
    LOG("log"),
    TAN("tan"),
    OPEN("("),
    CLOSE(")"),
    MULT("*"),
    DIV("/"),
    ADD("+"),
    SUB("-");

    private final String value;

    SpecialToken(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
