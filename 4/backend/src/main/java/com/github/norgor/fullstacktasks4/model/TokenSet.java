package com.github.norgor.fullstacktasks4.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TokenSet {
    private final List<String> tokens;

    public TokenSet(@JsonProperty("tokens") String[] tokens) {
        this.tokens = Arrays.asList(tokens);
    }

    /**
     * Returns an unmodifiable list of tokens
     * @return
     */
    public List<String> getTokens() {
        return Collections.unmodifiableList(tokens);
    }
}
