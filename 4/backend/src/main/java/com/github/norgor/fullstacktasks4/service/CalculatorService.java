package com.github.norgor.fullstacktasks4.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import com.github.norgor.fullstacktasks4.model.CalculationException;
import com.github.norgor.fullstacktasks4.model.CalculationResult;
import com.github.norgor.fullstacktasks4.model.TokenSet;
import com.github.norgor.fullstacktasks4.model.TokenSetToJSTranslator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
    private final Logger logger = LoggerFactory.getLogger(CalculatorService.class);
    private final ScriptEngine jsScriptEngine = new ScriptEngineManager().getEngineByName("graal.js");
  
    public CalculationResult calculate(TokenSet tokenSet) {
        try {
            String js = TokenSetToJSTranslator.translate(tokenSet);
            Object resultObject = jsScriptEngine.eval(js);
            double result = resultObject instanceof Integer
                ? (double)(Integer)resultObject
                : (double)resultObject;
            return CalculationResult.createWithValue(result);
        } catch (CalculationException e) {
            return CalculationResult.createWithError(e.getMessage());
        } catch (ScriptException e) {
            logger.error("Unable to evaluate JS", e);
            return CalculationResult.createWithError("Unable to perform calculation.");
        }
    }
}
