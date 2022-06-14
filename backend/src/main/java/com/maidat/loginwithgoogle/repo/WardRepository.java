package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.address.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, Long> {

    @Query(value = "select * from ward where district_id = ?1", nativeQuery = true)
    public List<Ward> getWardByDistrict(Long districtId);
}
