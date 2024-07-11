package com.teampraxis.repositories;

import com.teampraxis.models.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarkBookRepository extends JpaRepository<Dog, Long> {
}
