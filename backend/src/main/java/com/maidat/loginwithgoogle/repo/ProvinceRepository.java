package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.address.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Long> {
}
