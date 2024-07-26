package org.teampraxis.BarkBook_API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.teampraxis.BarkBook_API.models.BarkBookAuth;

@Repository
public interface BarkBookRepository extends JpaRepository<BarkBookAuth, Long> {
}
