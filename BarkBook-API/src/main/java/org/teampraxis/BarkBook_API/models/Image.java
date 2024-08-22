package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "images")
@Data   // shortcut for setters and getters, reduces code
@NoArgsConstructor // shortcut for empty constructor, reduces code
@AllArgsConstructor // shortcut for constructors, reduces code
@Builder    // create instances of this class with an API
public class Image {
    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String type;

    @Lob    // specifies DB should store the property as a large object
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imageData;

//    @ManyToOne
//    @JoinColumn(name = "dog_id")
//    private Dog dog;

}
