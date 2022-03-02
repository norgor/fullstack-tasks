package com.github.norgor.fullstacktasks4.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public class TokenSetToJSTranslator {
    private static final String NEXT_TOKEN = "$NEXT_TOKEN";
    private static final Pattern NUMBER_PATTERN = Pattern.compile("[\\d.]+");

    private static final Map<String, String> jsTokenMap = new HashMap<>(){{
        put(SpecialToken.SIN.getValue(), "Math.sin(" + NEXT_TOKEN  + ")");
        put(SpecialToken.COS.getValue(), "Math.cos(" + NEXT_TOKEN  + ")");
        put(SpecialToken.LOG.getValue(), "Math.log(" + NEXT_TOKEN  + ")");
        put(SpecialToken.TAN.getValue(), "Math.tan(" + NEXT_TOKEN  + ")");
        put(SpecialToken.OPEN.getValue(), "(");
        put(SpecialToken.CLOSE.getValue(), ")");
        put(SpecialToken.MULT.getValue(), "*");
        put(SpecialToken.DIV.getValue(), "/");
        put(SpecialToken.ADD.getValue(), "+");
        put(SpecialToken.SUB.getValue(), "-");
    }};

    private static int appendTranslatedToken(StringBuilder stringBuilder, List<String> tokens, int index) throws CalculationException {
        int consumed = 0;
        String token = tokens.get(index);
        if (NUMBER_PATTERN.matcher(token).matches()) {
            stringBuilder.append(token);
            return consumed;
        }

        String jsFormat = jsTokenMap.get(token);
        if (jsFormat == null) {
            throw new CalculationException("Invalid token " + token);
        } else if (jsFormat.contains(NEXT_TOKEN)) {
            if (index + 1 >= tokens.size()) {
                throw new CalculationException("Missing operand for token.");
            }
            jsFormat = jsFormat.replace(NEXT_TOKEN, tokens.get(index + 1));
            consumed++;
        }
        stringBuilder.append(jsFormat);
        return consumed;
      }
      
    public static String translate(TokenSet tokens) throws CalculationException {
        StringBuilder stringBuilder = new StringBuilder();
        List<String> tokenList = tokens.getTokens();
        for (int i = 0; i < tokenList.size(); i++) {
            i += appendTranslatedToken(stringBuilder, tokenList, i);
        }
        return stringBuilder.toString();
    }
}
