package com.maidat.loginwithgoogle.dto;

import com.maidat.loginwithgoogle.validator.PasswordMatches;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@PasswordMatches
public class SignUpRequest {

    private Long userID;

//    private String providerUserId;

    @NotEmpty
    private String displayName;

    @NotEmpty
    private String email;

    private SocialProvider socialProvider;

//    private boolean enabled;

    @Size(min = 6, message = "{Size.userDto.password}")
    private String password;

    @NotEmpty
    private String matchingPassword;

    public SignUpRequest(String displayName, String email,String password ,String matchingPassword,SocialProvider socialProvider ) {
//        this.providerUserId = providerUserId;
        this.displayName = displayName;
        this.email = email;
//        this.enabled = true;
        this.socialProvider = socialProvider;
        this.password = password;
        this.matchingPassword = matchingPassword;
    }

    public static Builder getBuilder() {
        return new Builder();
    }

    public static class Builder{
//        private String providerUserID;
        private String displayName;
        private String email;
        private SocialProvider socialProvider;
        private String password;
        private String matchingPassword;


//        public Builder addProviderUserID(final String userID) {
//            this.providerUserID = userID;
//            return this;
//        }


        public Builder addDisplayName(final String displayName) {
            this.displayName = displayName;
            return this;
        }

        public Builder addEmail(final String email) {
            this.email = email;
            return this;
        }

        public Builder addMatchingPassword(final String matchingPassword) {
            this.matchingPassword = matchingPassword;
            return this;
        }

        public Builder addPassword(final String password) {
            this.password = password;
            return this;
        }

        public Builder addSocialProvider(final SocialProvider socialProvider) {
            this.socialProvider = socialProvider;
            return this;
        }

        public SignUpRequest build() {
            return new SignUpRequest(displayName, email, password,matchingPassword ,socialProvider);
        }
    }
}
