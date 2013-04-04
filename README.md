VPlus
=====

Semantic and attribute based validation plugin for jQuery.
Validation isn't bound to form input field names. Validation depends on attribute values which means a lot less code that
is a lot more resuable and flexible. There is a very ligt but powerful api for adding custom attributes to the validation
and if that isnt enough you can fork the project.

See the README.md file for license information

## Basic Use

Add attributes as shown below which is a list of the currently available validation methods (more to come), or add your own (see the API docs below).
General use notes
1. Use the data- prefix for the attribute name
2. Always pass an array as the value !Note the array is in single quotes NOT double quotes
3. In the array STRING values are in double quotes (take note please).
4. Native validation methods also add the vp- prefix to the data attribute (i.e. data-vp-)
5. The first argument in the array of arguments is always the Error Message. Evene in cusotm methods always include the error method as the first array value
6. The second value in native methods is the expected value (look at examples)

 #### Options
 You can customize the error handler and you can customize the plugin by attaching it to either a form or a button
 !If the plugin is attached to a button be sure to pass {onSubmit: true} in the options if you want the validations to occur only when the form is submited.
  Otherwise the validation will take place when the input fields emit the blur event.

 Have fun it is easy to use and will save you time and code.

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
                   data-vp-min-length='["Must be at least 6 characters.", 6]'
                   data-vp-max-length='["Cannot be more than 10 characters.", 10]'>
        </div>
        <div>
            <label for="password2">Confirm Password</label>
            <input type="password" id="password2"
                   data-vp-match-field='["Passwords do not match.","#password"]'>
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

## Custom Validation API

There may be a circumstance where you might want to add your own validation rules. For this there is a simpel API but there are a few things you need to know first.

-----

1. You need to still speicfy a error message in the custom attribute as the first value in the array.
2. You also need to be aware that the validation must return false for any failed validation and true for passed validation
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

           //custom code in here whatever you need ajax calls or otherwise

                //return true for passed validation

                //returnh false for failed validation
           });
       });
```




