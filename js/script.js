//add functions in image player
$(function () {
  /*var time = $(".jsvp-video_controls").find(".jsvp-current_time").first().val();*/
  var time = $(".jsvp-video_controls").find(".jsvp-current_time").attr("value");
  var time2 = $(".fn.jsVideoPlayer")
    .find(".fn.jsVideoPlayer.defaultsVariables")
    .attr("currentTimeArray");
  var time3 = $(".jsvp-video_controls")
    .find(":input[class='jsvp-current_time']")
    .val();
  var time4 = $(":input.jsvp-current_time").val();
  $("#score-behavior").on("click", function () {
    $("#message")
      .text("Vs avez clique sur le boutton " + time4 + " " + time3)
      .fadeIn(100)
      .fadeOut(5000);
  });
  /*
  $("#playerInnerWrapper").one("click", function () {
    $("#message")
      .text("Vs avez clique sur le playerInnerWrapper.")
      .fadeIn(1000)
      .fadeOut(5000);
  });*/
  /* $.fn.jsVideoPlayer = function () {
    var currentTime = $(this).find("#" + currentTimeArray);
    alert(currentTime' : is the time');
  };*/
  /*$(function () {
    $("#demo1").jsVideoPlayer({
        var currentTime = $(this).find("#" + currentTimeArray);
        alert(currentTime +' : is the time');
    });
  });*/

  $(function () {
    $("#demo1").jsVideoPlayer({
      showTitle: false,
      showVolumeControl: false,
      playerWidth: 500,
      playerHeight: 280,
    });
  });
})(jQuery);
