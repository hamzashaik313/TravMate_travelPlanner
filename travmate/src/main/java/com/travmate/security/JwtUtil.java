//package com.travmate.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    private final String SECRET_KEY = "mysecretkey"; // 🔑 keep this safe (move to env variable later)
//    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
//
//    // ✅ Generate token
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//    }
//
//    // ✅ Extract username from token
//    public String extractUsername(String token) {
//        return extractAllClaims(token).getSubject();
//    }
//
//    // ✅ Validate token
//    public boolean validateToken(String token, String username) {
//        String extractedUsername = extractUsername(token);
//        return (username.equals(extractedUsername) && !isTokenExpired(token));
//    }
//
//    // --- Helpers ---
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET_KEY)
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractAllClaims(token).getExpiration().before(new Date());
//    }
//
//    public boolean validateToken(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//
//}

//package com.travmate.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//@Component
//public class JwtUtil {
//
//    private String SECRET_KEY = "travmate_secret_key"; // 🔑 Keep safe, move to env later
//
//    // ✅ Extract username from token
//    public String extractUsername(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    // ✅ Extract expiration date
//    public Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }
//
//    // ✅ Extract single claim
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    // ✅ Get all claims
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET_KEY)
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    // ✅ Check if token expired
//    private Boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    // ✅ Generate token
//    public String generateToken(UserDetails userDetails) {
//        Map<String, Object> claims = new HashMap<>();
//        return createToken(claims, userDetails.getUsername());
//    }
//
//    // ✅ Create token
//    private String createToken(Map<String, Object> claims, String subject) {
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(subject)  // username/email
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//    }
//
//    // ✅ Validate token
//    public Boolean validateToken(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//}


//hamzapvt8
//package com.travmate.security;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    private final String SECRET = "TravmateSecretKey123"; // ✅ keep safe
//    private final long EXPIRATION = 1000 * 60 * 60; // 1 hour
//
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
//                .signWith(SignatureAlgorithm.HS256, SECRET)
//                .compact();
//    }
//
//    public String extractUsername(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET)
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//}


//GEMINI
package com.travmate.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private String secret = "travmate_secret_key";  // keep in application.properties in real project
    private long jwtExpiration = 1000 * 60 * 60; // 1 hour

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean validateToken(String token, String email) {
        return email.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}


