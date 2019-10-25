# typeform-elements

[![npm version](https://badge.fury.io/js/typeform-elements.svg)](https://badge.fury.io/js/typeform-elements)

Custom elements for easy use of Typeform

## Table of Contents

* [Downloading Typeform Elements](#downloading-typeform-elements)
* [Elements](#elements)
* [Contributing](#contributing)

## Downloading Typeform Elements

You can install Typeform Elements via npm:

```shell
npm install typeform-elements
```

Or you can use Typeform Elements via CDN:

```html
<script src="https://unpkg.com/typeform-elements/dist/typeform-elements.js"></script>
```

If you do use this library from NPM be sure to import it somewhere in your JS code:

```javascript
import 'typeform-elements';

// or

export { /* Whatever component(s) you want */ } from 'typeform-elements';
```

## Elements

* [Login](#login)
* [Embed](#embed)

### Login

Add the button code to your application and configure it to work with the link that redirects users to the Typeform login screen ([https://api.typeform.com/oauth/authorize](https://api.typeform.com/oauth/authorize)) so they can log in to their Typeform accounts and grant access to your app via [OAuth 2.0 scopes](https://developer.typeform.com/get-started/scopes/).

#### CDN

You can use the login element via CDN without needing to import all of the Typeform Elements.

```html
<script src="https://unpkg.com/typeform-elements/dist/login.js"></script>
```

#### Usage

```html
<typeform-login client-id="{your_client_id}" scope="{comma_separated_scopes}" redirect-uri="{your_redirect_uri}" state="{optional_state}"></typeform-login>
```

#### Example

```html
<typeform-login client-id="1234567890" scope="accounts:read,forms:read" redirect-uri="https://results-example.herokuapp.com/callback"></typeform-login>
```

#### `TypeformLogin` (`<typeform-login>`) Attributes

|Attribute|Required|Description|Type|Default|
|--- |--- |--- |--- |--- |
|`client-id`|`true`|The id of the application that asks for authorization.|`String`|`null`|
|`redirect-uri`|`true`|A successful response from results in a redirect to this URL.|`String`|`null`|
|`scope`|`true`|List of permissions that the application requires. Ensure list is in comma separated format, like so: `accounts:read,forms:read`|`String`|`null`|
|`state`|`false`|An opaque value, used for security purposes. If this request parameter is set in the request, then it is returned to the application as part of the `redirect_uri`.|`String`|`null`|

### Embed

Easily display forms as elements on your page as a standard embeded form, a full page embeded form, and a pop up form.

#### CDN

You can use the login element via CDN without needing to import all of the Typeform Elements.

```html
<script src="https://unpkg.com/typeform-elements/dist/embed.js"></script>
```

#### Usage

```html
<typeform-widget url="{typeform_url}"></typeform-widget>

<typeform-popup url="{typeform_url}"></typeform-popup>
```

#### Example

```html
<typeform-widget url="https://admin.typeform.com/to/PlBzgL"></typeform-widget>

<typeform-popup url="https://admin.typeform.com/to/PlBzgL"></typeform-popup>
```

#### `TypeformWidget` (`<typeform-widget>`) Attributes

|Attribute|Required|Description|Type|Default|
|--- |--- |--- |--- |--- |
|`url`|`true`|URL of Typeform|`String`|`null`|
|`height`|`false`|Height of form. Accepts size in `%`, `cm`, `em`, `ex`, `in`, `mm`, `pc`, `p`, `px`, `vh`, or `vw`.|`String`|`"500px"`|
|`width`|`false`|Width of form. Accepts size in `%`, `cm`, `em`, `ex`, `in`, `mm`, `pc`, `p`, `px`, `vh`, or `vw`.|`String`|`"100%"`|
|`opacity`|`false`|You can make your Typeform's background totally transparent, or opaque. (For example, to have a video as a background)|`Number`|`100`|
|`button-text`|`false`|The button text that appears on mobile in order to open the Typeform.|`String`|`"Start"`|
|`hide-scrollbars`|`false`|Hide fixed scrollbars.|`Boolean`|`false`|
|`hide-footer`|`false`|Hide Typeform footer, that appears showing the progress bar and the navigation buttons.|`Boolean`|`false`|
|`hide-headers`|`false`|Hide Typeform header, that appears when you have a Question group, or a long question that you need to scroll through to answer, like a Multiple Choice block.|`Boolean`|`false`|
|`onsubmit`|`false`|Callback function that will be executed right after the Typeform is successfully submitted.|`Function`|`null`|

#### `TypeformPopup` (`<typeform-popup>`) Attributes

|Attribute|Required|Description|Type|Default|
|--- |--- |--- |--- |--- |
|`url`|`true`|URL of Typeform|`String`|`null`|
|`mode`|`false`|The way of showing the embed. Accepts `"popup"`, `"drawer_left"`, or `"drawer_right"`.|`String`|`"popup"`|
|`auto-open`|`false`|Your Typeform will launch as soon as your web page is opened|`Boolean`|`false`|
|`auto-close`|`false`|Time until the embedded Typeform will automatically close after a respondent clicks the Submit button. The default time is 5 seconds. PRO+ users can change the `auto-close` time.|`Number`|`5`|
|`hide-scrollbars`|`false`|Hide fixed scrollbars.|`Boolean`|`false`|
|`hide-footer`|`false`|Hide Typeform footer, that appears showing the progress bar and the navigation buttons.|`Boolean`|`false`|
|`hide-headers`|`false`|Hide Typeform header, that appears when you have a Question group, or a long question that you need to scroll through to answer, like a Multiple Choice block.|`Boolean`|`false`|
|`drawer-width`|`false`|Specify the width, in pixels, of the drawer (only applies if using `mode` `"drawer_left"` or `"drawer_right"`).|`Number`|`800`|
|`custom-style`|`false`|Applies custom styling to button element. Use as you would `style` attribute.|`string`|`null`|
|`onsubmit`|`false`|Callback function that will be executed right after the Typeform is successfully submitted.|`Function`|`null`|

## Contributing

All code should pass tests, as well as be well documented. Please open PRs into the `dev` branch. [Please also see the Commit Message Guidelines](CONTRIBUTING.md) for how commit messages should be structured.
