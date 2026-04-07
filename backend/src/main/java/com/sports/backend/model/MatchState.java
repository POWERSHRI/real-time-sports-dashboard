package com.sports.backend.model;

import java.util.*;

public class MatchState {

    private String teamA;
    private String teamB;

    private int runs = 0;
    private int wickets = 0;

    private int over = 0;
    private int ball = 0;

    private List<Integer> history = new ArrayList<>();

    private Random random = new Random();

    public MatchState(String teamA, String teamB) {
        this.teamA = teamA;
        this.teamB = teamB;
    }

    public void update() {

        // STOP at 20 overs
        if (over >= 20) return;

        // realistic cricket outcomes
        int outcome = random.nextInt(100);

        if (outcome < 5) {
            if (wickets < 10) wickets++;
        } else {
            int run;

            // realistic distribution
            int r = random.nextInt(100);

            if (r < 40) run = 1;
            else if (r < 65) run = 2;
            else if (r < 80) run = 0;
            else if (r < 92) run = 4;
            else run = 6;

            // limit total runs (~300 max)
            if (runs < 300) {
                runs += run;
            }
        }

        history.add(runs);

        ball++;
        if (ball == 6) {
            ball = 0;
            over++;
        }
    }

    public Map<String, Object> getData() {

        Map<String, Object> map = new HashMap<>();

        map.put("teamA", teamA);
        map.put("teamB", teamB);
        map.put("runs", runs);
        map.put("wickets", wickets);
        map.put("overs", over + "." + ball);
        map.put("history", history);

        return map;
    }
}