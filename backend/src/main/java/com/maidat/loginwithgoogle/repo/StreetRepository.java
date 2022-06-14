package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.address.Street;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreetRepository extends JpaRepository<Street, Long> {
}
