package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Display Name is a required field")
    @Size(max = 20)
    private String displayName;

    @NotBlank
    @Size(max = 100) // TODO: despite setting max 100, 20 is still enforced
    @Email
    private String email;

    @NotBlank(message = "Password is a required Field")
    @Size(max = 120)
    private String password;

    public User() {}

    public User(String email, String displayName, String password) {
        this.email = email;
        this.displayName = displayName;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
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

    // UserDetails Overrides for Spring Security

    // getUsername returns email because it is unique, display name is not
    @Override
    public String getUsername() {
        return email;
    }

    // leaving as empty list because we are not using roles
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    // the following 4 methods MUST return true or auth will fail.
    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
