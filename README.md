# TOTP Web Generator

Generate TOTP codes directly from your browser. The application works using only the APIs available to JavaScript; your data is not sent to a server as it never leaves your browser.

## Purpose

The entire application consists of a single hand-written HTML file which can be easily run offline by saving it to disk. The design makes it easy to use from a restricted environment like [Tails](https://tails.boum.org/) or in environments where it is impossible to install applications like a public internet cafe.

**Assumption:** TOTP keys are stored in a secure location which can be accessed from a web browser and you are able to safely transfer the key from storage into the application's input field (Copy/Paste or Manual typing using a hardware/virtual keyboard based on your threat model).

## Design

The application is hand writted using only the APIs provided by the browser and no external dependencies. This makes it possible to inspect and review the code to ensure that it has not been compromised.

A minimal build tool consisting of Bash and OpenSSL CLI is used to calculate hashes of the inline scripts and styles used. The hashes are used to configure the [Content Security Policy](https://content-security-policy.com/hash/).

## Settings

Currently, the secret key can only be entered in Base32 format. The default settings are configured to be compatible with Google Authenticator,
* HMAC Algorithm: SHA-1
* Period: 30 seconds
* Digits: 6

The values can be custmoized using the "Advanced Options" menu.

## Web Technologies Used

1. [Web Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) - Used to calculate the HMAC. [Browser Support](https://caniuse.com/cryptography)
2. [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - Used to store and process binary data according to [RFC 6238 (TOTP)](https://tools.ietf.org/html/rfc6238) and [RFC 4226 (HOTP)](https://tools.ietf.org/html/rfc4226). [Browser Support](https://caniuse.com/mdn-javascript_builtins_uint8array)
3. [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - Easier to work with Promises. [Browser Support](https://caniuse.com/async-functions)

## Acknowledgements

The application was built using the following as reference material,

* [bellstrand/totp-generator](https://github.com/bellstrand/totp-generator) - Reference TOTP implementation
* [RFC 6238 (TOTP)](https://tools.ietf.org/html/rfc6238)
* [RFC 4226 (HOTP)](https://tools.ietf.org/html/rfc4226)
* [Background Pattern](https://www.toptal.com/designers/subtlepatterns/double-bubble-outline-pattern/) - Background pattern by [Tomislava Babić](https://behance.net/antitomi)
