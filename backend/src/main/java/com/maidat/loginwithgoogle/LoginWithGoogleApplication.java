package com.maidat.loginwithgoogle;

import com.maidat.loginwithgoogle.dto.SocialProvider;
import com.maidat.loginwithgoogle.model.Role;
import com.maidat.loginwithgoogle.model.User;
import com.maidat.loginwithgoogle.repo.RoleRepository;
import com.maidat.loginwithgoogle.repo.UserRepository;
import com.maidat.loginwithgoogle.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.Set;

@SpringBootApplication(scanBasePackages = "com.maidat.loginwithgoogle")
@EnableJpaRepositories
@EnableTransactionManagement
public class LoginWithGoogleApplication extends SpringBootServletInitializer implements CommandLineRunner {

	@Autowired
	ImageService imageService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;


	public static void main(String[] args) {
		SpringApplication.run(LoginWithGoogleApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(LoginWithGoogleApplication.class);
	}


	@Override
	public void run(String... args) throws Exception {
		imageService.init();
	}
}
