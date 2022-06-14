package com.maidat.loginwithgoogle.repo;

import com.maidat.loginwithgoogle.model.MetaTags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetaTagRepo extends JpaRepository<MetaTags, Long> {
}
