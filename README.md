### IMPORTANT NOTE

⚠️ **This library hasn't been maintained for a while so we've decided to deprecate it and archive the repository.** 
**Please use [embed](https://github.com/Typeform/embed) instead.**

---

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

import { /* Whatever component(s) you want */ } from 'typeform-elements';
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

<typeform-popup formId="{typeform_form_id}"></typeform-popup>
```

#### Example

```html
<typeform-widget url="https://admin.typeform.com/to/PlBzgL"></typeform-widget>

<typeform-popup formId="PlBzgL"></typeform-popup>
```

#### Attributes

|Attribute|Required|Description|Type|Default|
|--- |--- |--- |--- |--- |
|`url`|`false`|URL of Typeform, if no URL provided `formId` must be provided.|`String`|`null`|
|`formId`|`false`|Form ID of Typeform, if no form ID provided `url` must be provided.|`String`|`null`|

All elements have the following attributes: `autoClose`, `buttonText`, `chat`, `height`, `hideFooter`, `hideHeaders`, `opacity`, `width`.

All elements emit the following events: `submit`.

[Please read more about them here.](https://developer.typeform.com/embed/configuration#available-options)

## Contributing

All code should pass tests, as well as be well documented. Please open PRs into the `dev` branch. [Please also see the Commit Message Guidelines](CONTRIBUTING.md) for how commit messages should be structured.
