package com.maidat.loginwithgoogle.validator;

import com.maidat.loginwithgoogle.dto.SignUpRequest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, SignUpRequest> {
    @Override
    public boolean isValid(SignUpRequest signUpRequest, ConstraintValidatorContext constraintValidatorContext) {
        return signUpRequest.getPassword().equals(signUpRequest.getMatchingPassword());
    }
}
