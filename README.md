# TOTP Web Generator

Generate TOTP codes directly from your browser. The application works using only the APIs available to JavaScript; your data is not sent to a server as it never leaves your browser.

## Purpose

The entire application consists of a single handwritten HTML file that can be run offline by saving it to disk. The design makes it easy to use from a restricted environment like [Tails](https://tails.boum.org/) or in places where it is impossible to install applications like a public internet cafe.

**Assumption:** TOTP keys are stored in a secure location that can be accessed from a web browser. You can safely transfer the key from storage into the application's input field (Copy/Paste or Manual typing using a hardware/virtual keyboard based on your threat model).

## Design

The application is handwritten using only the APIs provided by the browser and no external dependencies. This makes it possible to inspect and review the code to ensure that it has not been compromised.

A minimal build tool consisting of Bash and OpenSSL CLI is used to calculate hashes of the inline scripts and styles used. The hashes are used to configure [Content Security Policy](https://content-security-policy.com/hash/) for the site using a [meta tag](https://content-security-policy.com/examples/meta/) which makes it easy to host as a static site using [Netlify](https://www.netlify.com/).

## Settings

The default settings are configured to be compatible with Google Authenticator,
* HMAC Algorithm: SHA-1
* Period: 30 seconds
* Digits: 6

The values can be customized using the "Advanced Options" menu.

Currently, you can only enter the secret key in Base32 format.

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
