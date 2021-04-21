# TOTP Web Generator

Generate TOTP codes directly from your browser. The application works using only the APIs available to JavaScript; your data remains only in your browser.

![Application Screenshot](https://github.com/k3karthic/totp-generator-web/raw/main/resources/screenshot.png)

## Purpose

The entire application consists of a single HTML file that can be used offline by saving the it to disk and running it locally. The design makes it easy to use in a restricted environment like [Tails](https://tails.boum.org/) or in places where it is impossible to install applications like a public internet cafe.

**Assumption:** TOTP keys are stored in a secure location that can be accessed from a web browser. You can safely transfer the key from storage into the application's input field (Copy/Paste or Manual typing using a hardware/virtual keyboard based on your threat model).

## Design

The application is written using only the APIs provided by the browser and no external dependencies. This makes it possible to inspect and review the code to ensure that it has not been compromised.

## Settings

The default settings are configured to be compatible with Google Authenticator,

-   HMAC Algorithm: SHA-1
-   Period: 30 seconds
-   Digits: 6

The values can be customized using the "Advanced Options" menu.

Currently, you can only enter the secret key in Base32 format.

## Web Technologies Used

1. [Web Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) - Used to calculate the HMAC. [Browser Support](https://caniuse.com/cryptography)
2. [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - Used to store and process binary data according to [RFC 6238 (TOTP)](https://tools.ietf.org/html/rfc6238) and [RFC 4226 (HOTP)](https://tools.ietf.org/html/rfc4226). [Browser Support](https://caniuse.com/mdn-javascript_builtins_uint8array)
3. [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - Easier to work with Promises. [Browser Support](https://caniuse.com/async-functions)

## Development

The following tools are used only during development,

-   [ESLint](https://eslint.org/) - Code lint for JavaScript
-   [Prettier](https://prettier.io/) - Code formatting
-   [Live Server](https://github.com/tapio/live-server) - Auto reload on changes to `site/index.html`
-   [Visual Studio Code](https://code.visualstudio.com/) - Code editor with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

A minimal build tool (`watch.js`) is used to calculate hashes of the inline scripts and styles used. The hashes are used to configure [Content Security Policy](https://content-security-policy.com/hash/) for the site using a [meta tag](https://content-security-policy.com/examples/meta/) which makes it easy to host as a static site using [Netlify](https://www.netlify.com/).

Run the following commands in different tabs,

```
npm run start
npm run watch
```

## Deployment

The site is deployed on [Netlify](https://www.netlify.com/) with a GitHub build hook to automatically push a new version when a commit is made to the `main` branch. The contents of the `dist` folder is used for the deployment.

Development is on the `devel` branch and merged with `main` for a release.

Run the following command to update the `dist` folder,

```
npm run build
```

The command removes CSP configuration which is only required for development.

## Acknowledgements

The application was built using the following as reference material,

-   [bellstrand/totp-generator](https://github.com/bellstrand/totp-generator) - Reference TOTP implementation
-   [RFC 6238 (TOTP)](https://tools.ietf.org/html/rfc6238)
-   [RFC 4226 (HOTP)](https://tools.ietf.org/html/rfc4226)
-   [Background Pattern](https://www.toptal.com/designers/subtlepatterns/double-bubble-outline-pattern/) - Background pattern by [Tomislava Babić](https://behance.net/antitomi)
