package com.maidat.loginwithgoogle.util;

import com.maidat.loginwithgoogle.dto.LocalUser;
import com.maidat.loginwithgoogle.dto.SocialProvider;
import com.maidat.loginwithgoogle.dto.UserInfo;
import com.maidat.loginwithgoogle.model.Role;
import com.maidat.loginwithgoogle.model.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;

public class GeneralUtils {

    public static List<SimpleGrantedAuthority> buildSimpleGrantedAuthorities(final Set<Role> roles){
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role role: roles){
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }

    public static SocialProvider toSocialProvider(String providerId){
        for (SocialProvider socialProvider: SocialProvider.values()){
            if (socialProvider.getProviderType().equals(providerId)){
                return socialProvider;
            }
        }
        return SocialProvider.LOCAL;
    }

    public static UserInfo buildUserInfo(LocalUser localUser){
        List<String> roles = localUser.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
        User user = localUser.getUser();
        return new UserInfo(user.getId().toString(), user.getDisplayName(), user.getEmail(),user.getSex(),user.getPhone(),user.getDateOfBirth(), roles);
    }

    public static Date calculateExpiryDate(final int expiryTimeInMinutes){
        final Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Date().getTime());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }
}
