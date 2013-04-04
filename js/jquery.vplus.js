(function($) {

  $.fn.vPlus = function(config) {

    var defaults = {
      onSubmit: false,
      setError: function(element, message) {
        console.log(message);
      }
    };
    var options = $.extend({}, defaults, config);
    var methods = {
      vpRequired: function(expected, message) {
        if (!this.val()) {
          options.setError(this, message);
          return false;
        }
        return true;
      },
      vpMinLength: function(expected, message) {
        if (this.val().length < expected) {
          options.setError(this, message);
          return false;
        }
        return true;
      },
      vpMaxLength: function(expected, message) {
        if (this.val().length > expected) {
          options.setError(this, message);
          return false;
        }
        return true;
      },
      vpMatchField: function(fieldSelector, message) {
        if (this.val() !== $(fieldSelector).val()) {
          options.setError(this, message);
          return false;
        }
        return true;
      }
    };

    return this.each(function() {
      var $scope = $(this);

      if (!options.onSubmit) {
        $scope.on('blur', 'input', function() {
          var $element = $(this);
          var data = $element.data();
          $.each(data, function(key, value) {
            if (methods[key]) {
              return methods[key].apply($element, value);
            }
            return true;
          });
        });
      } else {
        $scope.on('click', function(e) {
          e.preventDefault();
          var $inputs = $scope.closest('form').find('input');

            $inputs.each(function () {
              var $element = $(this);
              var data = $element.data();
              $.each(data, function(key, value) {
                if (methods[key]) {
                  return methods[key].apply($element, value);
                }
                return true;
              });
            })
        });
      }
    });
  };
}(jQuery));