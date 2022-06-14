package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.MetaTagName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetaTagNameRepo extends JpaRepository<MetaTagName, Long> {
}
