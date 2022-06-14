package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.config.CurrentUser;
import com.maidat.loginwithgoogle.dto.InfoShopDTO;
import com.maidat.loginwithgoogle.dto.LocalUser;
import com.maidat.loginwithgoogle.enums.ImageStatus;
import com.maidat.loginwithgoogle.model.*;
import com.maidat.loginwithgoogle.repo.ImageRepository;
import com.maidat.loginwithgoogle.repo.OptionLinkRepository;
import com.maidat.loginwithgoogle.repo.ShopInfoRepository;
import com.maidat.loginwithgoogle.repo.UserRepository;
import com.maidat.loginwithgoogle.service.AddressService;
import com.maidat.loginwithgoogle.service.UserServiceImpl;
import com.maidat.loginwithgoogle.service.impl.ProductServiceImpl;
import com.maidat.loginwithgoogle.util.GeneralUtils;
import com.maidat.loginwithgoogle.util.response.ResponseMessage;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    ProductServiceImpl productService;
    @Autowired
    ShopInfoRepository shopInfoRepository;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    UserServiceImpl userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OptionLinkRepository optionLinkRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getCurrentUser(@CurrentUser LocalUser user){
        return ResponseEntity.ok(GeneralUtils.buildUserInfo(user));
    }

    @GetMapping("/user/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUser(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<?> deleteUsers(@RequestParam("email") String email){
        userRepository.deleteByEmail(email);
        return ResponseEntity.ok(new ResponseMessage("delete success"));
    }

    @PostMapping("/createTutorial")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createTutorial(@RequestBody OptionLink optionLink){
        return ResponseEntity.ok(optionLinkRepository.save(optionLink));
    }
}
