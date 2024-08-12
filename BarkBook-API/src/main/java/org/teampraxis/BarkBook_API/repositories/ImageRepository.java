package org.teampraxis.BarkBook_API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.teampraxis.BarkBook_API.models.Image;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
   Optional <Image> findByName(String filename);
}
