package org.teampraxis.BarkBook_API.auth.dto;

public class RegisterUserDTO {
    private String email;
    private String password;
    private String verifyPassword;
    private String displayName;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public String getDisplayName() {
        return displayName;
    }

}
