VPlus
=====

Selector based validation for jQuery. You aren't
bound to just form inputs, you can use any 
selector (class or id)

### Not Stable Yet! Stand by for an update :)

#### Usage
```js
        $('#myForm').vPlus(
                {
                    rules: {
                        '#email': {
                            isRequired: {
                                expect: true,
                                errorMsg: 'we have an issue'
                            }
                        },
                        '#password': {
                            isRequired: {
                                expected: true,
                                errorMsg: 'Please enter a password'
                            },
                            minLength: {
                                expected: 6,
                                errorMsg: 'Password must be at least 6 chars'
                            },
                            maxLength: {
                                expected: 15,
                                errorMsg: 'Password cannot be more than 15 chars.'
                            }
                        },
                        '#password2':{
                            isRequired: {
                                expected: true,
                                errorMsg: 'Please re-enter the password'
                            },
                            equalElementValue:{
                                expected: '#password',
                                errorMsg: 'Passwords do not match'
                            }
                        }
                    }
                }
        );
```
