package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.teampraxis.BarkBook_API.models.dto.DogRepository;

@Controller
@RequestMapping("add-dog")
public class DogController {

    @Autowired
    private DogRepository dogRepository;
}
