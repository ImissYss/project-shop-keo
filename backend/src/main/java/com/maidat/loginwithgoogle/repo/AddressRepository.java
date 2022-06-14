package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.AddressUser;
import com.maidat.loginwithgoogle.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<AddressUser, Long> {
    List<AddressUser> findByUser(User user);
}
