package com.msk.Sentiment.security;

import com.msk.Sentiment.entity.User;
import com.msk.Sentiment.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.lang.String;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Value("${frontend.success.url}")
    private String frontendUrl;

    private final UserRepository userRepository;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
        String email = defaultOAuth2User.getAttribute("email").toString();
        String name = defaultOAuth2User.getAttribute("name").toString();
        String picture = defaultOAuth2User.getAttribute("picture").toString();

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setProfilePictureUrl(picture);

        // save the user to db , if user is not present in db
        User user2 = userRepository.findByEmail(email);
        if(user2 == null){
            userRepository.save(user);
        }

        new DefaultRedirectStrategy().sendRedirect(request, response, frontendUrl);

    }
}
