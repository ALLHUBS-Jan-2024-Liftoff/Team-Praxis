package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class BarkBookAuth {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Username is a required field")
    private String username;

    @NotBlank(message = "Password is a required Field")
    private String password;

    public BarkBookAuth() {}

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
