package com.sports.backend.controller;

import com.sports.backend.model.MatchState;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.*;

@Controller
public class LiveController {

    private final SimpMessagingTemplate template;
    private final List<MatchState> matches = new ArrayList<>();

    public LiveController(SimpMessagingTemplate template) {
        this.template = template;

        matches.add(new MatchState("India", "Australia"));
        matches.add(new MatchState("England", "Pakistan"));
        matches.add(new MatchState("South Africa", "New Zealand"));

        startSimulation();
    }

    private void startSimulation() {

        new Thread(() -> {
            while (true) {
                try {
                    Thread.sleep(5000); // every 5 seconds = 1 ball

                    List<Map<String, Object>> data = new ArrayList<>();

                    for (MatchState m : matches) {
                        m.update();
                        data.add(m.getData());
                    }

                    template.convertAndSend("/topic/live", data);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}