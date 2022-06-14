package com.maidat.loginwithgoogle.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String toMail,
                         String subject,
                         String body){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("dat@gmail.com");
        message.setTo(toMail);
        message.setSubject(subject);
        message.setText(body);

        javaMailSender.send(message);
        System.out.println("Mail send success");
    }
}
