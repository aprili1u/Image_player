$(function () {
  $("#score-behavior").on("click", function () {
    $("#message")
      .text("Vs avez clique sur le boutton.")
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
  $(function () {
    $("#demo1").jsVideoPlayer({
      showTitle: false,
      showVolumeControl: false,
      playerWidth: 500,
      playerHeight: 280,
    });
  });
})(jQuery);
