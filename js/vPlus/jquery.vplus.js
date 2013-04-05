/*
 vPlus a jQuery form validation plugin
 Copyright (C) 2013  Edgar Martinez

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//todo: Add validation for radio buttons
//todo: Add validation for select boxes
//todo: Add validation for textareas
(function($) {
  $.fn.vPlus = function(config, fn) {
    var defaults;
    var options;
    var methods = $.fn.vPlus.methods;

    if (typeof config == "string") {
      methods[config] = fn;
      return true;
    }

    defaults = {
      onSubmitOnly: false,
      errorClass: $.fn.vPlus.errorClass,
      failHandler: $.fn.vPlus.failHandler,
      clearErrors: $.fn.vPlus.clearErrors
    };
    options = $.extend({}, defaults, config);


    return this.each(function() {
      var $scope = $(this);

      $scope.on('focus', 'input', function() {
        options.clearErrors($(this));
      });

      $scope.on('submit', function(e) {
        var $inputs = $scope.closest('form').find('input');
        var errors = false;
        $inputs.each(function() {
         options.clearErrors($(this), options.errorClass);
          var $element = $(this);
          var data = $element.data();
          $.each(data, function(key, org) {
            var args = org.slice(0);
            var error = args.shift();
            if (methods[key]) {
              if (!methods[key].apply($element, args)) {
                options.failHandler($element, error, options.errorClass);
                e.preventDefault();
                errors = true;
                return false;
              }
            }
            return true;
          });
        });
        if(!errors){
          $scope.trigger('valid');
        }else{
          $scope.trigger('notvalid');
        }
      });

      if (options.onSubmitOnly) {
        return true;
      }

      $scope.on('blur', 'input', function() {
        var $element = $(this);
        var data = $element.data();
        $.each(data, function(key, org) {
          var args = org.slice(0);
          var error = args.shift();
          if (methods[key]) {
            if (!methods[key].apply($element, args)) {
              options.failHandler($element, error, options.errorClass);
              return false;
            }
          }
          return true;
        });
      });
    });
  };

  $.fn.vPlus.errorClass = 'error';

  $.fn.vPlus.methods = {
    vpRequired: function() {
      return this.val();
    },
    vpMinLength: function(expected) {
      return this.val().length >= expected;
    },
    vpMaxLength: function(expected) {
      return this.val().length <= expected;
    },
    vpMatchField: function(fieldSelector) {
      return this.val() === $(fieldSelector).val();
    }
  };

  $.fn.vPlus.failHandler = function (element, message, errorClass) {
    element.addClass(errorClass);
    element.after('<span class="error-message">' + message + '</span>');
  };

  $.fn.vPlus.clearErrors = function (element, errorClass) {
    element.removeClass(errorClass);
    element.next('.error-message').remove();
  }
}(jQuery));