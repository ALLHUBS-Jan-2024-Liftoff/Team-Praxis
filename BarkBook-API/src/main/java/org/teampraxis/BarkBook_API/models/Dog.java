package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "dog")
@Data   // shortcut for setters and getters, reduces code
@NoArgsConstructor // shortcut for empty constructor, reduces code
@AllArgsConstructor // shortcut for constructors, reduces code
@Builder    // create instances of this class with an API
public class Dog {

    @Id
    @GeneratedValue
    private int id;

    @OneToMany(mappedBy = "dog", cascade = CascadeType.ALL)
    private List<Image> images;

    @NotBlank(message = "Name your dog!")
    @Size(max = 10)
    private String dogName;

    @NotNull(message = "Enter your dogs age.")
    private int dogAge;

    @NotBlank(message = "Enter your dogs breed.")
    private String breed;

    @NotNull(message = "Enter your dogs weight")
    private int weight;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

}
