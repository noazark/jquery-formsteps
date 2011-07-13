/* Created by jankoatwarpspeed.com */
(function($) {
  $.fn.formsteps = function(options) {
    options = $.extend({
        submit_button: 'input[type=submit]',
        id_prefix: 'step'
    }, options);
    
    var that = this;
    
    var steps = $(that).find("fieldset");
    var count = steps.size();
    $(options.submit_button).hide();

    $(that).before("<ul id='" + options.id_prefix + "'></ul>");

    steps.each(function(step) {
      $(this).wrap("<div id='" + options.id_prefix + step + "'></div>");
      $(this).append("<p id='" + options.id_prefix + step + "commands'></p>");

      var name = $(this).find("legend").html();
      $("#" + options.id_prefix).append("<li id='stepDesc" + step + "'>Step " + (step + 1) + "<span>" + name + "</span></li>");

      if (count == 1) {
        $(options.submit_button).show();
        return;
      }
      
      if (step == 0) {
        createNextButton(step);
      }
      else if (step == count - 1) {
        $("#" + options.id_prefix + step).hide();
        createPrevButton(step);
      }
      else {
        $("#" + options.id_prefix + step).hide();
        createPrevButton(step);
        createNextButton(step);
      }
    });

    function createPrevButton(i) {
      var stepName = options.id_prefix + i;
      $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>< Back</a>");
      $("#" + stepName + "Prev").bind("click", function(e) {
        $(options.submit_button).hide();
        setStep(i - 1);
      });
    }

    function createNextButton(i) {
      var stepName = options.id_prefix + i;
      $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next ></a>");
      $("#" + stepName + "Next").bind("click", function(e) {
        if (i + 2 == count) {
          $(options.submit_button).show();
        }
        setStep(i + 1);
      });
    }

    function setStep(i) {
      $("div[id^=" + options.id_prefix + "]", that).hide();
      $("#" + options.id_prefix + i, that).show();
      $("input[name='" + options.id_prefix +"']", that).val(i + 1)
    }
    setStep(0);
    
    return $(that);
  }
})(jQuery);
