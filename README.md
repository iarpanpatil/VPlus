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
                   data-vp-required='["Cannot be empty.", true]'
                   data-vp-min-length='["Must be at least 6 characters.", 6]'
                   data-vp-max-length='["Cannot be more than 10 characters.", 10]'>
        </div>
        <div>
            <label for="email">Email</label>
            <input type="text" id="email"
                   data-vp-required='["Cannot be empty.", true]'>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password"
                   data-vp-required='["Cannot be empty.", true]'
                   data-vp-min-length='["Must be at least 6 characters.", 10]'
                   data-vp-max-length='["Cannot be more than 12 characters.", 10]'>
        </div>
        <div>
            <label for="password2">Confirm Password</label>
            <input type="password" id="password2"
                   data-vp-match-field='["#password"]'>
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

## API

There may be a circumstance where you might want to add your own validation rules for this there is a simpel API, but there are a few things you need to know first.

-----

1. You need to still speicfy a error message in the custom attribute as the first value in the array.
2. You also need to be aware that the validation must return false for any failed validation
3. The attribute name is dashed cased while the validation function name is camelCased.

-----

```html
<form id="myForm">
    <fieldset>
        <legend>My Custom Field</legend>
        <div>
            <label>Custom Validation</label>
            <input type="text" id="custom"
                   data-vp-custom='["something is not cool"]' >
        </div>
        <button id="submit">Submit</button>
    </fieldset>
</form>
```

```js
    $().ready(function() {
           $('#myForm').vPlus();
           $('#myForm').vPlus('vpCustom', function (){
                //return true for passed validation

                //returnh false for failed validation
           });
       });
```


