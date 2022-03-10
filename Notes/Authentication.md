## Authentication
- the process of verifying an identity
- Make sure you are the right person

## Authorization
- the process of verifying what some is allowed to do (permission)

## Auth workflow
- provide username and password and receive password

## /signup (POST)
1. Hash passsword
- Don't use MD5
- Use bcrypt (e.g. 10 rounds mean hasing 2^10 times) 
2. Save the hashed password + username to a SQL Table
3. Send back the JWT or "force" the user to validate email first

## /login (POST)
1. Hash password using bcrypt
2. Compare with the hased password in the database
3. If they match, send JWT. If not, send error (HTTP Status Code: 401)

## JWT (JSON Web Token)
- A secure way to transfer claims between 2 parties
- The claims can be digitally signed or encrypted
- The integrity of the message is protected. (Message created on server, sent to client. Client can understand the message, but if the message is changed and send to the server. The server will know it.)
    - Nobody can change the content
- Everybody can see the JWT payload/ claims
    - Don't send private data, like user password, address.
- The more data you add to JWT, the bigger the payload on every request

## Components in JWT
- Header - base64 encoded json with 2 properties: "alg" and "type" (algorithm use the encrypt the secure part and type which is always JWT)
- Payload/ Claims - base64 encoded json with some reserved words:
    - "iss" (Issuer) Claim
    - "sub" (Subject) Claim
    - "aud" (Audience) Claim
    - "exp" (Expiration Time) Claim
- Signature/ Secret, this keep the integrity of the message
    - If the payload change, the signature will change

Example: 
``` 
var HEADER_HASH = base64(header);
var PAYLOAD_HASH = base64(payload);
var SIGNATURE_HASH = base64(signature);
var JTW = HEADER_HASH + '.' + PAYLOAD_HASH + '.' + SIGNATURE_HASH;
```

## Request Flow (authenticated)
1. Server checks if JWT token is provided
2. If provided, check if the signature match. If match, execute the request.
3. If not provided/ not match/ expired, return error (HTTP Status Code 401)

### How to persist auth token between page reloads?
2 Ways:
1. Cookies
2. WebStorage
    - Local Storage
    - Session Storage

## LocalStorage/ SessionStorage
Pros:
- Protected again CSRF attacks
  - e.g. Malicious website can use make a POST request of the URL of your bank account to transfer money using a form. Cookies will send the cookie on every single request by default to the domain.

Cons:
- We need to add the Authentication Token to every request
- Vulnerable to XSS (Cross site scripting)
  - Attacker inject JS in your web app and get access to local storage
  - So local storage is not recommend to store sensitive data

## Cookies
Pros:
- Mitigated XSS attacks is using "httpOnly"
  - httpOnly cookie is a way to get the cookie through http only, you cannot get it through javascript (document.getCookie())
- Cookies are sent "automatically" in every request

Cons:
- CSRF (cross-site requeset forgery), because cookies are sent "automatically" on every request

## Mitigation for attacks:
  - Add 2FA (2-factor authentication)
  - Protect yourself agains XSS in DOM input or API input. (e.g. use escaping)
  - Add "secure", "httpOnly" and "SameSite" to your cookies
    - "SameSite" will prevent cookie being sent in different domain
  - Use CSRF Tokens
  - Require Re-authentication for Sensitive Feature (e.g. one time password to phone for money transfer)
  - Consult your company's security team
  - Use Https
    - Use https for every single endpoint/page in your website
    - Redirect from http to https
    - Free Certificate for custom domains: https://letencrypt.org
      - Available in: Zeit Now, Netlify, Firebase