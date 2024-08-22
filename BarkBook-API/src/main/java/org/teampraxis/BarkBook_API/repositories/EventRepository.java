package org.teampraxis.BarkBook_API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.models.User;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    public List<Event> findByCreator(User creator);

}
