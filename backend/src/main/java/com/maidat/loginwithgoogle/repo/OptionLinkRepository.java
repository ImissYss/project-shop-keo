package com.maidat.loginwithgoogle.repo;


import com.maidat.loginwithgoogle.enums.Option;
import com.maidat.loginwithgoogle.model.OptionLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OptionLinkRepository extends JpaRepository<OptionLink, Long> {

    @Transactional
    @Query(value = "select * from option_link where status = :status", nativeQuery = true)
    OptionLink getOptionLink(@Param("status") Integer status);
}
