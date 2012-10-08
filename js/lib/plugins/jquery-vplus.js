/**
 * Depends:
 * jquery
 * @extends jQuery.fn
 */
(function ($) {

    /**
     * Add the plugin to the jQuery prototype
     * @param {object} options
     * @return {function}
     * @this {jQuery}
     * @constructor
     * @example
     * $("#mySelector").vplus({rules: { ".hello-world": { isRequired: true  }}});
     */
    $.fn.vplus = function (options) {

        //return of no options exist
        if (options === undefined) {
            throw new Error("No options provided");
        }

        var defaults = {
            errorClass: 'error',
            expressions: {
                email: '',
                url: ''
            }
        };

        options = $.extend(defaults, options);

        var plugin = $.fn.vplus;

        /**
         * @param {String} val
         * @return {Boolean}
         */
        plugin.isRequired = function (val) {
            return (val != '');
        };

        /**
         * @param {string} val
         * @param {string} expected
         */
        plugin.isEmail = function (val, expected) {
            //TODO: implement this
        };

        /**
         * @param {String} val
         * @param {Number} expected
         * @return {Boolean}
         */
        plugin.maxLength = function (val, expected) {
            return (val.length <= expected);
        };

        /**
         * @param {String} val
         * @param {Number} expected
         * @return {Boolean}
         */
        plugin.minLength = function (val, expected) {
            return (val.length >= expected);
        };

        //do this so we can ensure chaining
        return this.each(function () {

            //makes searches inside this plugin faster
            var form = $(this);
            var rules = options.rules;

            //iterate over each selector
            for (var selector in rules) {

                //iterate over each validation rule per selector
                for (var rule in rules[selector]) {

                    //check the selector properties are validation rule names
                    if (plugin.hasOwnProperty(rule)) {

                        //iterate over every selector rule
                        $.each(form.find(selector), function (k, field) {
                            var elem = $(field);
                            var method = rules[selector][rule];

                            //this allows us to get a value froim a input field or the text from an editable area
                            var val = (typeof elem.val === 'undefined')? elem.text(): elem.val();

                            if (!plugin[rule](val, method.expected, elem)) {

                                if (typeof method.callBack !== 'function') {

                                    //add the error message as a label
                                    if (method.errorMsg) {
                                        elem.after('<label>' + method.errorMsg + '</label>');
                                    }
                                } else {
                                    method.callBack(elem);
                                }
                                elem.addClass(options.errorClass);
                            }
                        });
                    }
                }
            }
        });
    };
}(jQuery));