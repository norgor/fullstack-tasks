package com.github.norgor.fullstacktasks4.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class CalculationResult {
    private final Double value;
    private final String error;

    private CalculationResult(Double value, String error) {
        this.value = value;
        this.error = error;
    }

    public Double getValue() {
        return this.value;
    }

    public String getError() {
        return this.error;
    }

    public static CalculationResult createWithError(String error) {
        return new CalculationResult(null, error);
    }

    public static CalculationResult createWithValue(double value) {
        return new CalculationResult(value, null);
    }
}
