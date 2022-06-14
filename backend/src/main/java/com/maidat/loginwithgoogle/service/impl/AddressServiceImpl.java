package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.model.AddressUser;
import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.repo.AddressRepository;
import com.maidat.loginwithgoogle.service.AddressService;
import com.maidat.loginwithgoogle.service.LocalUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    AddressRepository addressRepository;
    @Autowired
    LocalUserDetailService localUserDetailService;

    @Override
    public AddressUser addAddressByUser(AddressUser addressUser, Principal principal) {
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        addressUser.setUser(user);
        return addressRepository.save(addressUser);
    }

    @Override
    public List<AddressUser> getAddress(Principal principal) {
        User user = localUserDetailService.loadUserByUsername(principal.getName()).getUser();
        return addressRepository.findByUser(user);
    }


}
