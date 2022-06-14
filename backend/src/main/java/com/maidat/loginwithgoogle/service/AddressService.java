package com.maidat.loginwithgoogle.service;

import com.maidat.loginwithgoogle.model.AddressUser;

import java.security.Principal;
import java.util.List;

public interface AddressService {
    AddressUser addAddressByUser(AddressUser addressUser, Principal principal);
    List<AddressUser> getAddress(Principal principal);
}
