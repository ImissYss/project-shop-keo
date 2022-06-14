package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.InfoShop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopInfoRepository extends JpaRepository<InfoShop, Long> {
}
