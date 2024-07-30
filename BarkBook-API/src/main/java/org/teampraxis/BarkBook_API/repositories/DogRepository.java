package org.teampraxis.BarkBook_API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.teampraxis.BarkBook_API.models.Dog;

@Repository
public interface DogRepository extends JpaRepository<Dog, Integer> {
}
