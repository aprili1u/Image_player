//add functions in image player

var state = 0;

//#score-behavior changes class on click
$(function () {
  $("#score-behavior").on("click", function () {
    /*$("#message")
      .text(
        "Vs avez clique sur le boutton " + $(".jsvp-control-currentTime").val()
      )
      .fadeIn(100)
      .fadeOut(5000);

    */
    if (state == 0) {
      state = 1;
    } else {
      state = 0;
    }

    $(":button#score-behavior").toggleClass("E", 1000);
    $(":button#score-behavior").toggleClass("B", 1000);
  });
});

//On click message is shown
$(function () {
  $(":button#score-behavior").on("click", function () {
    $("#message")
      .text("Vs avez clique sur le boutton " + state)
      .fadeIn(100)
      .fadeOut(5000);
  });
});

//when clicking on score-behavior we add a ligne in the table
$(function () {
  var i = 0;
  $(":button#score-behavior.B").click(function () {
    var T = $(".jsvp-control-currentTime").val();
    if (state == 1) {
      i += 1;

      var ligne =
        '<tr><td><input type="text" id="fish' +
        i +
        '" value="mot1" /> </td><td>' +
        '<input type="text" id="begin' +
        i +
        '" value="0:0" />' +
        "</td><td>" +
        '<input type="text" id="end' +
        i +
        '" value="Eeeend" />' +
        "</td></tr>";

      $("table.Table").prepend(ligne);

      $("#begin" + i).val(T);
    }
    if (state == 0) {
      $("#end" + i).val(T);
    }
  });
});

//use jsVideoPlayer
$(function () {
  $("#demo1").jsVideoPlayer({
    showTitle: false,
    showVolumeControl: false,
    playerWidth: 500,
    playerHeight: 280,
  });
});
