package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Images")
@Data   // shortcut for setters and getters, reduces code
@NoArgsConstructor // shortcut for constructors, reduces code
@AllArgsConstructor // shortcut for constructors, reduces code
public class Image {
    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String type;

    @Lob    // specifies DB should store the property as a large object
    private byte imageData;
}
