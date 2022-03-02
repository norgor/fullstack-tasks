package com.github.norgor.fullstacktasks4.controller;

import com.github.norgor.fullstacktasks4.model.CalculationResult;
import com.github.norgor.fullstacktasks4.model.TokenSet;
import com.github.norgor.fullstacktasks4.service.CalculatorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/calculator/")
@CrossOrigin
public class CalculatorController {
    private final Logger logger = LoggerFactory.getLogger(CalculatorController.class);

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/calculate")
    public CalculationResult calculate(@RequestBody TokenSet tokenSet) {
        logger.info("Calculate request!");
        return calculatorService.calculate(tokenSet);
    }
}
