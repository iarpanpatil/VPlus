VPlus
=====

Selector based validation for jQuery. You aren't
bound to just form inputs, you can use any 
selector (class or id)

### Not Stable Yet! Stand by for an update :)

#### Usage
```js
        $('#myForm').vplus(
                {
                    rules: {
                        '#email': {
                            isRequired: {
                                expect: true,
                                errorMsg: 'we have an issue'

                            }
                        }
                    }
                }
        );
```
