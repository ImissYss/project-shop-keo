package com.maidat.loginwithgoogle.controller;

import com.maidat.loginwithgoogle.messages.ResponseMessage;
import com.maidat.loginwithgoogle.model.AddressUser;
import com.maidat.loginwithgoogle.model.address.Ward;
import com.maidat.loginwithgoogle.repo.AddressRepository;
import com.maidat.loginwithgoogle.repo.DistrictRepository;
import com.maidat.loginwithgoogle.repo.ProvinceRepository;
import com.maidat.loginwithgoogle.repo.WardRepository;
import com.maidat.loginwithgoogle.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/address")
public class ProvinceController {

    @Autowired
    ProvinceRepository provinceRepository;
    @Autowired
    DistrictRepository districtRepository;
    @Autowired
    WardRepository wardRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    AddressService addressService;

    @GetMapping("/province")
    public ResponseEntity<?> getProvinces(){
        return ResponseEntity.ok(provinceRepository.findAll());
    }


    @GetMapping("/district/{provinceId}")
    public ResponseEntity<?> getDistrictByProvince(@PathVariable("provinceId") Long provinceId){
        return ResponseEntity.ok(districtRepository.findByProvince(provinceId));
    }

    @GetMapping("/ward/{districtId}")
    public ResponseEntity<?> getWarnByDistrict(@PathVariable("districtId") Long districtId){
        return ResponseEntity.ok(wardRepository.getWardByDistrict(districtId));
    }

    @GetMapping("/getAddress")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAddress(Principal principal){
        return ResponseEntity.ok(addressService.getAddress(principal));
    }

    @PostMapping("/addAddress")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addAddress(@RequestBody AddressUser addressUser, Principal principal){
        return ResponseEntity.ok(addressService.addAddressByUser(addressUser, principal));
    }

    @DeleteMapping("/deleteAddress/{addressId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteAddress(@PathVariable("addressId") Long addressId){
        addressRepository.deleteById(addressId);
        return ResponseEntity.ok(new ResponseMessage("Delete success"));
    }



}
