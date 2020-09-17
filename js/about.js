$(document).ready(function () {
  function setIntroSize() {
    if ($("body").hasClass("home")) {
      // set margin below main to reveal footer
      var newMargin = $("footer").outerHeight() + 20 + "px";
      $(".main")[0].style.marginBottom = newMargin;
    }
  }

  window.onresize = setIntroSize;
  setIntroSize();

  // Animate the scrolling
  function scrollToAnchor(aid) {
    var divTag = $("a[name='" + aid + "']");
    var newPos = divTag.offset().top - $(".header").height();
    if (aid == "contact") {
      $("html,body").animate({ scrollTop: $(document).height() }, "fast");
    } else {
      $("html,body").animate({ scrollTop: newPos }, "fast");
    }
  }

  $(".nav a").click(function (e) {
    e.preventDefault();
    $(".nav a").removeClass("active");
    $(this).addClass("active");
    if ($("body").hasClass("home")) {
      if (!$(this).hasClass("inactive")) {
        window.history.pushState(null, null, $(this).attr("href"));
        var dest = $(this)
          .attr("href")
          .substring(1, $(this).attr("href").length);
        if (dest != "") {
          scrollToAnchor(dest);
        }
      }
    }
  });

  let urlHash = $(location).attr("hash");

  if (urlHash) {
    $(".nav a").removeClass("active");
    $("a[href='" + urlHash + "']").addClass("active");
    scrollToAnchor(urlHash.substring(1, urlHash.length));
  }

  let isMobile = window.matchMedia("(max-width: 35em)");

  if (isMobile.matches) {
    $(".opencall .rr").on("click", function (e) {
      let cssProp = $(".nav").css("display");
      if (cssProp == "block") {
        $(".nav").css({ display: "none" });
      } else {
        $(".nav").css({ display: "block" });
      }
    });
  }
});
