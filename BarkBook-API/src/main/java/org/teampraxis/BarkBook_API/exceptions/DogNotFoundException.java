package org.teampraxis.BarkBook_API.exceptions;

public class DogNotFoundException  extends  RuntimeException {
    public DogNotFoundException(Integer id){
        super("Could not find the dog with the id " + id);
    }
}
