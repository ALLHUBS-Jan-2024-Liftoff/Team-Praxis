package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Username is a required field")
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 20)
    @Email
    private String email;

    @NotBlank(message = "Password is a required Field")
    @Size(max = 120)
    private String password;

    public User() {}

    public User(String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public @NotBlank @Size(max = 20) @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Size(max = 20) @Email String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
