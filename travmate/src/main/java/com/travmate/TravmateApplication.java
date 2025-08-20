
package com.travmate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.travmate")
public class TravmateApplication {
    public static void main(String[] args) {
        SpringApplication.run(TravmateApplication.class, args);
    }
}