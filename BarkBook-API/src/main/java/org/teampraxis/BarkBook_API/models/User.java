package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "user")
@Data   // shortcut for setters and getters, reduces code
@NoArgsConstructor // shortcut for empty constructor, reduces code
@AllArgsConstructor // shortcut for constructors, reduces code
@Builder    // create instances of this class with an API
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

    // for user who created the event
    @OneToMany(mappedBy = "creator")
    private List<Event> createdEvents;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Dog> dogs;

    // for user who attends events
//    @ManyToMany
//    @JoinTable(name="user_event", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
//    private List<Event> attendingEvents;


    public @NotBlank @Size(max = 20) @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Size(max = 20) @Email String email) {
        this.email = email;
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
