package org.teampraxis.BarkBook_API.exceptions;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(int id){
        super("Could not found the user with id "+ id);
    }

}
