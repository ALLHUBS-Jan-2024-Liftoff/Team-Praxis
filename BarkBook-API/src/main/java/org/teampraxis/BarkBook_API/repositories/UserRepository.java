package org.teampraxis.BarkBook_API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.teampraxis.BarkBook_API.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
