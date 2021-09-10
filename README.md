# TOTP Web Generator

Generate [TOTP](https://en.wikipedia.org/wiki/Time-based_One-Time_Password) codes directly in your browser for Two-Factor Authentication (2FA). Compatible with authenticator applications like [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_IN&gl=US), [Authy](https://authy.com/) and [Microsoft Authenticator](https://www.microsoft.com/en-in/account/authenticator).

Demo: [https://totp.maverickgeek.xyz/](https://totp.maverickgeek.xyz/)

![Application Screenshot](resources/screenshot.png)

## Design

The application is written using only the JavaScript APIs provided by the browser and does not use any external libraries.

The entire application consists of a single HTML file that can be used offline by saving the it to disk and running it locally. The design makes it easy to use in a restricted environment like [Tails](https://tails.boum.org/) or in places where you are not allowed to install applications like a public internet cafe.

**Assumption:** TOTP keys are stored in a secure location and you can safely transfer the key from storage into the web application's input field (Copy/Paste or Manual typing using a hardware/virtual keyboard based on your threat model).

## Settings

The default settings are configured to be compatible with Google Authenticator,

* HMAC Algorithm: SHA-1
* Period: 30 seconds
* Digits: 6

The values can be customized using the "Advanced Options" menu.

The application supports secret keys in the following formats,
* Base32 (case-insensitive) - e.g. XY7MXDNK5ZEKJT4Y or xy7mxdnk5zekjt4y
* Base32 with spaces (case-insensitive) - e.g. g5od kqdo hqkd 4kup qr2d txc2 2cfh wylh

## Web Technologies Used

1. [Web Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) - Used to calculate the HMAC. [Browser Support](https://caniuse.com/cryptography)
2. [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - Used to store and process binary data according to [RFC 6238 (TOTP)](https://tools.ietf.org/html/rfc6238) and [RFC 4226 (HOTP)](https://tools.ietf.org/html/rfc4226). [Browser Support](https://caniuse.com/mdn-javascript_builtins_uint8array)
3. [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - Easier to work with Promises. [Browser Support](https://caniuse.com/async-functions)
4. [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) - Browser API used to structure the UI as components while avoiding JavaScript framework churn. [Browser Support](https://caniuse.com/custom-elementsv1)

## Development

The following tools are used only during development,

-   [ESLint](https://eslint.org/) - JavaScript linter
-   [Prettier](https://prettier.io/) - Code formatting
-   [Live Server](https://github.com/tapio/live-server) - Auto reload on changes to `site/index.html`
-   [Visual Studio Code](https://code.visualstudio.com/) - Code editor with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

A minimal build tool (`watch.js`) is used to calculate hashes of the inline scripts and styles used. The hashes are used to configure [Content Security Policy](https://content-security-policy.com/hash/) for the site using a [meta tag](https://content-security-policy.com/examples/meta/) which makes it easy to host as a static site using [Netlify](https://www.netlify.com/).

Use the following command to start the build tool which watches for changes to `src/index.html`.
```
npm run watch
```

Use the following command to start live-server.
```
npm run start
```

## Deployment

The site is deployed on [Netlify](https://www.netlify.com/) with a GitHub build hook to automatically push a new version when a commit is made to the `main` branch. The contents of the `dist` folder is used for the deployment.

Development is done on the `devel` branch and merged with `main` for a release.

Use the following command to update the `dist` folder which is served by Netlify. The command removes CSP configurations which are only required for development.
```
npm run build
```

## Acknowledgements

The application was built using the following references,

-   [bellstrand/totp-generator](https://github.com/bellstrand/totp-generator) - Reference TOTP implementation
-   [RFC 6238 (TOTP)](https://tools.ietf.org/html/rfc6238)
-   [RFC 4226 (HOTP)](https://tools.ietf.org/html/rfc4226)
-   [Background Pattern](https://www.toptal.com/designers/subtlepatterns/double-bubble-outline-pattern/) - Background pattern by [Tomislava Babić](https://behance.net/antitomi)
