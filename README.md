VPlus
=====

Selector based validation for jQuery. You aren't
bound to just form input field names, you can use any
selector (class or id)

### Not Stable Yet! Stand by for an update :)

#### Usage

```html
<form id="myForm">
    <fieldset>
        <legend>My Special Fields</legend>
        <div>
            <label for="username">Username</label>
            <input type="text" id="username"
                   data-vp-required='[true,"Cannot be empty."]'
                   data-vp-min-length='[6,"Must be at least 6 characters."]'
                   data-vp-max-length='[10,"Cannot be more than 12 characters."]'>
        </div>
        <div>
            <label for="email">Email</label>
            <input type="text" id="email"
                   data-vp-required='[true,"Cannot be empty."]'>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password"
                   data-vp-required='[true,"Cannot be empty."]'
                   data-vp-min-length='[6,"Must be at least 6 characters."]'
                   data-vp-max-length='[10,"Cannot be more than 12 characters."]'>
        </div>
        <div>
            <label for="password2">Confirm Password</label>
            <input type="password" id="password2"
                    data-vp-match-field='["#password", "Passwords do not match."]'>
        </div>
        <button id="submit">Submit</button>
    </fieldset>
</form>
```

```js
    $(function() {
        $('#submit').vPlus({
            onSubmit: true,
            setError: function (ui, message){
                //some custom error function if you wish or use the default function
            }
        });
    });
```
