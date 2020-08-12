/*
 *  jQuery Image Player v1.0.0
 *
 *  Copyright (c) 2015 Sulaman Wadiwala
 *  http://www.uiplayground.in/jquery-image-player/
 *
 *  Licensed under MIT
 *
 */

!(function ($) {
  function runTimeElements(t, e) {
    var a = '<div class="jsvp-control-bar">'; //allows access to the div maybe creating it..
    (a += '<a href="javascript:;" class="jsvp-control-pause"></a>'), //adding or selecting class pause
      (a += '<a href="javascript:;" class="jsvp-control-play"></a>'), // class play
      (a +=
        '<input type="text" class="jsvp-control-currentTime" value="0:0" readonly="readonly" />'),
      (a +=
        '<div class="jsvp-control-player-bar"><div id="slider-sliderWrapper_' +
        gloCnt +
        '" class="jsvp-player-slider"></div></div>'),
      (a +=
        '<input type="text" class="jsvp-control-totalTime" readonly="readonly" />'),
      /*(a +=
        '<div class="jsvp-control-volume-bar"><div id="slider-volume_' +
        gloCnt +
        '" class="jsvp-volume-slider"></div></div>'),*/
      /*(a +=
        '<a href="javascript:;" class="jsvp-control-title" title="Show/Hide Title"></a>'),
      (a += "</div>"),*/
      t.append(a),
      t
        .addClass("jsvp-wrapper")
        .find("ul")
        .addClass(
          "jsvp-ul"
        ); /*add class jsvp-wrapper cf jquery-image-player-min.css*/
    var s = parseInt(
        t.find(".jsvp-control-bar").css("height")
      ) /*manage size of control bar size */,
      i = e.playerWidth + "px",
      r = e.playerHeight + "px",
      n = e.playerHeight - -s + "px";
    t.css({ height: n, width: i }).find(".jsvp-ul").css("height", r),
      t.find(".jsvp-control-bar").css({ width: i }),
      t.find(".jsvp-hidden").remove();
    var l = "";
    //this is like writting in the html file?
    (l += '<div class="jsvp-hidden">'), //def different stages of opacity. Not very important here
      (l += "<style>"),
      (l +=
        "[data-effect=fade_0]{opacity:0;}   [data-effect=fade_1]{opacity:0.1;} [data-effect=fade_2]{opacity:0.2;}"),
      (l +=
        "[data-effect=fade_3]{opacity:0.3;} [data-effect=fade_4]{opacity:0.4;} [data-effect=fade_5]{opacity:0.5;} [data-effect=fade_6]{opacity:0.6;}"),
      (l +=
        "[data-effect=fade_7]{opacity:0.7;} [data-effect=fade_8]{opacity:0.8;} [data-effect=fade_9]{opacity:0.9;}"),
      (l += "</style>"),
      (l += '<div class="jsvp-dummy"></div>'),
      (l += '<div class="jsvp-audioPlayerWrapper">blank</div>'),
      (l += '<a href="javascript:;" class="jsvp-getVal">getVal</a>'),
      (l += '<input type="text" class="jsvp-sec" />'),
      (l += '<input type="text" class="jsvp-tot" />'),
      (l += '<div class="jsvp-video_controls">'),
      (l +=
        '<input type="text" min="0" max="100" step="2" class="jsvp-current_time" value="0000" />'),
      (l +=
        '<input type="text" min="0" max="100" step="2" class="jsvp-LoadProgressFlag" value="false" />'),
      (l +=
        '<input type="text" min="0" max="100" step="2" class="jsvp-load_progress" value="asd" />'),
      (l +=
        '<input type="text" min="0" max="100" step="2" class="jsvp-timePercent_1" value="fghjkl" />'),
      (l += "</div>"),
      (l += "</div>"),
      t.append(l),
      t.find("ul li").eq(0).addClass("jsvp-first-frame").show();
  }
  function generalClickEvents(t, e, a) {
    var s = 0,
      i = 44;
    0 == e.showTitle &&
      (t.find(".title, .jsvp-control-title").hide(),
      (s -= i)) /* otherwise a T for title appearse in the control bar*/,
      0 == e.showCurrentTime &&
        (t.find(".jsvp-control-currentTime").hide(), (s -= i)),
      0 == e.showTotalTime &&
        (t.find(".jsvp-control-totalTime").hide(), (s -= i)),
      0 == e.showSliderTime &&
        (t.find(".jsvp-control-player-bar").hide(), (s -= i));
    var r = parseInt(t.find(".jsvp-control-bar").css("width")),
      n = 4 * i - -s,
      l = r - n;
    t.find(".jsvp-control-player-bar, .jsvp-player-slider").css("width", l),
      //manage playing when clik on play icon
      a.button_play.click(function () {
        $(this).hide(),
          $(this).parent().find(".jsvp-control-pause").show(),
          (a.flagPlayPause = !0),
          t.find(".jsvp-sec").val() >= t.find(".jsvp-tot").val(),
          startCounterSec(t, e, a);
      }),
      //manage pausing when clik on pause icon
      a.button_pause
        .click(function () {
          $(this).hide(),
            $(this).parent().find(".jsvp-control-play").show(),
            (a.flagPlayPause = !1);
        })
        //Manage hidding pause icon at the beginning
        .eq(0)
        .click(),
      a.button_title.click(function () {
        1 == a.flagTitle
          ? ((a.flagTitle = !1),
            t.find(".jsvp-title").hide(),
            $(this).addClass("jsvp-control-title-hide"))
          : 0 == a.flagTitle &&
            ((a.flagTitle = !0),
            t.find(".jsvp-title").show(),
            $(this).removeClass("jsvp-control-title-hide"));
      });
  }

  function trackSliderEvents(t, e, a) {
    t.find(".jsvp-ul li").each(function () {
      a.tTime1 = a.tTime1 - -$(this).attr("data-duration"); //get data duration from each image cf real-index.html
    });
    var s = a.tTime1,
      i = s - 10;
    t.find(".jsvp-control-totalTime").val(millisToMinutesAndSeconds(i)), //get the time working
      t.find(".jsvp-tot").val(i);
    for (var r = 0, n = 0; n < a.galLeng; n++)
      (r += parseInt(t.find(".jsvp-ul li").eq(n).attr("data-duration"))),
        a.currentTimeArray.push(r);
    t.find(".jsvp-control-player-bar .jsvp-player-slider ").slider({
      //get the juice bar working + clickable?
      value: 0,
      min: 0,
      max: a.tTime1,
      step: 1,
      range: "min",
      slide: function () {
        a.button_pause.click(); //isn't supposed to activate pause when slider used?
      },
      stop: function (s, i) {
        (a.counterSec = i.value),
          t.find(".jsvp-audioPlayerWrapper").html("blank"),
          t.find(".jsvp-load_progress").val(0),
          a.button_play.click(),
          (a.flagJumpAudio = !0),
          jumpAudio(t, e, a),
          setTimeout(function () {
            a.button_pause.click();
          }, 20);
      },
    });

    //attempt to make a listener from click button when click, anywhere in the bar pause the video. -> doesn't work
    t.find("jsvp-control-player-bar .jsvp-player-slider").click({
      function() {
        if ((flagPlayPause = !0)) {
          $(a.button_pause).hide(),
            $(a.button_pause).parent().find(".jsvp-control-play").show(),
            (a.flagPlayPause = !1);
        }
      },
    });

    $("playerInnerWrapper").click({
      function() {
        if ((flagPlayPause = !0)) {
          $(this).hide(),
            $(this).parent().find(".jsvp-control-play").show(),
            (a.flagPlayPause = !1);
        }
      },
    });
  }
  function startCounterSecTimeout(t, e, a) {
    /*fait avancer la video*/
    if (
      (t.find(".jsvp-first-frame").hide(),
      0 == Math.ceil(t.find(".jsvp-sec").val()) &&
        t.find(".jsvp-first-frame").show(),
      1 == a.atEndOfVideo &&
        t.find(".jsvp-sec").val() >= t.find(".jsvp-tot").val())
    ) {
      (a.atEndOfVideo = !1), (a.flagPlayPause = !0);
      var s = 0;
      (a.counterSec = s),
        t.find(".jsvp-sec").val(s),
        t.find(".jsvp-control-currentTime").val(s),
        t.find(".jsvp-load_progress").val(s),
        t.find(".jsvp-control-player-bar .jsvp-player-slider").slider({
          value: s,
          animate: !0,
          slide: a.button_pause.click() /*function (a) {
            $(this).hide(),
              $(this).parent().find(".jsvp-control-play").show(),
              (a.flagPlayPause = !1);
          },*/,
        }); //add a condition when animated : pause video
    } else
      parseInt(t.find(".jsvp-sec").val()) >=
        parseInt(t.find(".jsvp-tot").val()) &&
        (a.button_pause.click(), (a.atEndOfVideo = !0), (a.flagPlayPause = !1));
    if (1 == a.flagPlayPause && a.counterSec <= a.leng) {
      t.find(".jsvp-ul .current").hide().removeClass("current");
      for (var i = 0; i < a.leng; i++)
        if (
          a.currentTimeArray[i] <= a.counterSec &&
          a.currentTimeArray[i + 1] >= a.counterSec
        ) {
          t.find(".jsvp-ul li")
            .eq(i + 1)
            .show()
            .addClass("current");
          break;
        }
      var r = a.counterSec,
        n = "0:0";
      (n = r),
        t
          .find(".jsvp-control-currentTime")
          .val(millisToMinutesAndSeconds(n)) /*use a fct described later*/,
        t.find(".jsvp-sec").val(parseInt(a.counterSec)),
        t.find(".jsvp-control-player-bar .jsvp-player-slider").slider({
          value: a.counterSec,
          animate: !0,
          /*slide: a.button_pause.click(),*/ //pauses all the time otherwise
        }),
        (a.counterSec += 10),
        startCounterSec(t, e, a);
    }
  }
  function startCounterSec(t, e, a) {
    (a.leng = a.currentTimeArray[a.currentTimeArray.length - 1]),
      (a.timer = setTimeout(function () {
        startCounterSecTimeout(t, e, a);
      }, 12));
  }
  function generateEffects(thsWrap, opts, dv) {
    (_this = thsWrap.find(".jsvp-ul")),
      (_fadeInLeng = _this.find("[data-effect=fadeIn]").length);
    for (var i = 0; i < _fadeInLeng; i++) {
      (_obj = _this.find("[data-effect=fadeIn]").eq(0)),
        (_objVal = _obj.parents("li").attr("data-duration")),
        _obj.parents("li").addClass("addFadeCont");
      for (var j = 1; 10 > j; j++)
        _obj.attr("data-effect", "fade_" + j),
          (html = _obj.parents("li").html()),
          (_fadeInCont =
            '<li data-duration="' + _objVal + '">' + html + "</li>"),
          $(_fadeInCont).insertBefore(".addFadeCont");
      _this.find(".addFadeCont").removeClass("addFadeCont");
    }
    _fadeOutLeng = _this.find("[data-effect=fadeOut]").length;
    for (var i = 0; i < _fadeOutLeng; i++) {
      (_obj = _this.find("[data-effect=fadeOut]").eq(0)),
        (_objVal = _obj.parents("li").attr("data-duration")),
        _obj.parent().addClass("addFadeCont");
      for (var j = 0; 10 > j; j++)
        _obj.attr("data-effect", "fade_" + j),
          (html = _obj.parents("li").html()),
          (_fadeOutCont =
            '<li data-duration="' + _objVal + '">' + html + "</li>"),
          $(_fadeOutCont).insertAfter(".addFadeCont");
      _this.find(".addFadeCont").removeClass("addFadeCont");
    }
    _animateToLeng = _this.find("[data-effect=animate]").length;
    for (var i = 0; i < _animateToLeng; i++)
      _this
        .find("[data-effect=animate]")
        .eq(i)
        .parents("li")
        .addClass("jsvp-addAniCont" + i);
    for (var i = 0; i < _animateToLeng; i++) {
      (_obj = _this.find("[data-effect=animate]").eq(i)),
        (_obj = _this
          .find(".jsvp-addAniCont" + i)
          .find("[data-effect=animate]")),
        (lng = _obj.attr("data-effect-animate").split(";"));
      var strCssOld = "",
        strCss = "",
        stepsLeng = _obj.attr("data-effect-steps");
      for (l = 0; l < lng.length; l++) {
        var strCssTest = lng[l].split(":"),
          strCssAttr1 = $.trim(strCssTest[0]),
          strCssAttr2 = strCssTest[1];
        (strCss += strCssAttr1 + "," + strCssTest[1] + ","),
          (strCssOld += strCssAttr1 + "," + _obj.css(strCssAttr1) + ",");
      }
      for (var styleStrArr = [], t = 0; stepsLeng >= t; t++)
        styleStrArr.push([]);
      for (
        var strCssLength = strCss.split(","), s = 0;
        s < strCssLength.length - 1;
        s++
      )
        if (s % 2 == 0)
          for (var t = 0; stepsLeng >= t; t++) {
            (strCssArray = strCss.split(",")),
              (strCssOldArray = strCssOld.split(","));
            var v1 = strCssArray[s],
              v2 = strCssArray[s - -1],
              v3 = strCssOldArray[s - -1],
              type = v2.replace(/[-,.,0-9]/g, "");
            (isNaN(type) || "" == type) &&
              (type = v3.replace(/[-,.,0-9]/g, "")),
              (v2 = parseInt(v2)),
              (v3 = parseInt(v3));
            var v4 = v2 - v3;
            0 > v2 && (v4 = v3 - -v2);
            var v5 = v4 / stepsLeng,
              v6 = (v3 - -v5 * t).toFixed(1),
              v7 = v6;
            0 > v3 && (v7 = (v3 - v5 * t).toFixed(1)),
              isNaN(v4) && (v4 = v5 = v7 = v2),
              styleStrArr[t].push('"' + v1 + '":"' + v7 + type + '"');
          }
      _obj.addClass("jsvp-dataEffectAnimate");
      var html = _obj.parents("li").html(),
        _objDefaultDura = _obj.parents("li").attr("data-duration");
      thsWrap.find(".jsvp-dummy").html(html);
      for (var j = stepsLeng; j > 0; j--) {
        var styleString = "{" + styleStrArr[j].join(",") + "}",
          styleStringEval =
            "thsWrap.find('.jsvp-dummy').find('.jsvp-dataEffectAnimate').css(" +
            styleString +
            ")";
        eval(styleStringEval),
          (_animateToCont =
            '<li data-duration="' +
            _objDefaultDura +
            '">' +
            thsWrap.find(".jsvp-dummy").html() +
            "</li>"),
          $(_animateToCont).insertAfter(".jsvp-addAniCont" + i);
      }
      _obj
        .parents("ul")
        .find(".jsvp-dataEffectAnimate")
        .removeClass("jsvp-dataEffectAnimate"),
        thsWrap.find(".jsvp-dummy").html(" ");
    }
    thsWrap.find(".jsvp-dummy").remove();
  }
  function millisToMinutesAndSeconds(t) {
    //adding milliseconds
    var e = t,
      a = (e / 1e2 / 60) << 0,
      s = (e / 1e2) % 60;
    return a + ":" + Math.ceil(s);
  }

  var gloCnt = 0;

  $.fn.jsVideoPlayer = function (t) {
    ($.fn.jsVideoPlayer.defaults = {
      showTitle: !0,
      showCurrentTime: !0,
      showTotalTime: !0,
      showSliderTime: !0,
      onFinishGotoStart: !1,
      playerWidth: 650,
      playerHeight: 650,
    }),
      ($.fn.jsVideoPlayer.defaultsVariables = {
        timer: null,
        galLeng: null,
        tTime1: 0,
        counterSec: 0,
        leng: null,
        flagFirstTime: !0,
        flagJumpAudio: !1,
        flagPlayPause: !0,
        flagTitle: !0,
        currentTimeArray: [],
        button_play: null,
        button_pause: null,
        /*button_volume: null,*/
        button_title: null,
        thsCounter: 0,
        atEndOfVideo: !1,
      }),
      this.each(function () {
        var e, a;
        (e = $.extend({}, $.fn.jsVideoPlayer.defaults, t)),
          (e = $.extend({}, e)),
          (a = $.extend({}, $.fn.jsVideoPlayer.defaultsVariables, t)),
          (a = $.extend({}, a)),
          (thsWrap = $(this)),
          a.thsCounter++,
          runTimeElements(thsWrap, e, a),
          generateEffects(thsWrap, e, a),
          (a.button_play = thsWrap.find(".jsvp-control-play")),
          (a.button_pause = thsWrap.find(".jsvp-control-pause")),
          (a.button_title = thsWrap.find(".jsvp-control-title")),
          (a.galLeng = thsWrap.find(".jsvp-ul > li").length),
          trackSliderEvents(thsWrap, e, a),
          generalClickEvents(thsWrap, e, a),
          gloCnt++;
      });
  };
})(jQuery);

playerInnerWrapper.addEventListener("click", function () {
  if ((flagPlayPause = !0)) {
    button_pause.click();
  }
});
