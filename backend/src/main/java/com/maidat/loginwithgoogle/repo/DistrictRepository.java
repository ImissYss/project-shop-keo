package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.address.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Long> {

    @Query(value = "select * from district where province_id = ?1", nativeQuery = true)
    public List<District> findByProvince(Long provinceId);
}
