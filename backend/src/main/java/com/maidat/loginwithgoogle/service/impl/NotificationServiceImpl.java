package com.maidat.loginwithgoogle.service.impl;

import com.maidat.loginwithgoogle.model.Notification;
import com.maidat.loginwithgoogle.repo.NotificationRepository;
import com.maidat.loginwithgoogle.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    NotificationRepository notificationRepository;

    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
}
