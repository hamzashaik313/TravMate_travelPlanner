package com.travmate.controller;

import com.travmate.service.GeoapifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/geoapify")
public class GeoapifyController {

    @Autowired
    private GeoapifyService geoapifyService;

    @GetMapping("/places/{city}")
    public List<String> getTouristPlaces(@PathVariable String city) {
        return geoapifyService.getTouristPlaces(city);
    }
}


