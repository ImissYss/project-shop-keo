package com.maidat.loginwithgoogle.exception.handler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;

import java.lang.reflect.Method;

public class CustomAsyncExceptionHandler implements AsyncUncaughtExceptionHandler {
    private final Logger logger = LogManager.getLogger(getClass());

    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... obj) {
        logger.error("Method name - " + method.getName(), ex);
        for (Object param : obj){
            logger.error("Parameter value - " + param);
        }
    }
}
