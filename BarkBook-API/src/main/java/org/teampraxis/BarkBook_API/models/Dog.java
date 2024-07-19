package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Dog {
    @Id
    @GeneratedValue
    private int id;

    @NotBlank(message = "Name your dog!")
    @Size(max = 10, message = "Are you trying to confuse your dog? One or two syllables long!")
    private String dogName;

    @NotBlank(message = "Enter your dogs age.")
    private int dogAge;

    @NotBlank(message = "Enter your dogs breed.")
    private String breed;

    @NotBlank(message = "Enter your dogs weight")
    private int weight;

    public Dog(String dogName, int dogAge, String breed, int weight) {
        this.dogName = dogName;
        this.dogAge = dogAge;
        this.breed = breed;
        this.weight = weight;
    }

    public Dog() {}

    public int getId() {
        return id;
    }

    public String getDogName() {
        return dogName;
    }

    public void setDogName(String dogName) {
        this.dogName = dogName;
    }

    public int getDogAge() {
        return dogAge;
    }

    public void setDogAge(int dogAge) {
        this.dogAge = dogAge;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
