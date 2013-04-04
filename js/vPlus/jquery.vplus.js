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
//todo: Add error class to input element
(function($) {
  var failHandler;
  var methods = {
    vpRequired: function(expected) {
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

  $.fn.vPlus = function(config, fn) {
    var defaults;
    var options;

    if (typeof config == "string") {
      methods[config] = fn;
      return true;
    }

    defaults = {
      onSubmitOnly: false,
      failHandler: function(element, message) {
        element.after('<span class="error-message">' + message + '</span>');
      },
      clearErrors: function(element) {
        element.next('.error-message').remove();
      }
    };
    options = $.extend({}, defaults, config);
    failHandler = options.failHandler;

    return this.each(function() {
      var $scope = $(this);

      $scope.on('focus', 'input', function() {
        options.clearErrors($(this));
      });

      $scope.on('submit', function(e) {
        var $inputs = $scope.closest('form').find('input');
        var errors = false;
        $inputs.each(function() {
         options.clearErrors($(this));
          var $element = $(this);
          var data = $element.data();
          $.each(data, function(key, org) {
            var args = org.slice(0);
            var error = args.shift();
            if (methods[key]) {
              if (!methods[key].apply($element, args)) {
                failHandler($element, error);
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
              failHandler($element, error);
              return false;
            }
          }
          return true;
        });
      });
    });
  };
}(jQuery));