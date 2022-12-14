let meunOpen = false; //選單開啟與否
let searchBarOpen = false; //search開啟與否
let sortHead = $(".arrow-control thead th"); //表格篩選圖示

//開啟收合的選單
$(".meun-btn").on("click", function () {
  if (meunOpen) {
    meunOpen = false;
    $("body,html").removeClass("active");
  } else {
    meunOpen = true;
    $("body,html").addClass("active");
  }
});
//桌機版時 當搜尋 input focus時 搜尋bar維持打開狀態
$(".search-box").on("mouseenter", function (e) {
  if ($("body").width() > 1200) {
    $(this).on("click", function (e) {
      if (e.target.matches("input")) {
        $(this).addClass("onFocus");
      }
    });
  }
});
//桌機版時 當點擊非搜尋區域時 搜尋bar便會關閉
$("body").on("click", function (e) {
  if ($("body").width() > 1200) {
    if (
      e.target.matches(".search-icon") ||
      e.target.matches(".search-input") ||
      e.target.matches(".search-box")
    ) {
      $(".search-box").addClass("onFocus");
    } else {
      $(".search-box").removeClass("onFocus");
    }
  }
});

//寬度小於 1200 時的search input
$(".search-box").on("click", function (e) {
  if ($("body").width() < 1200) {
    if (e.target.matches("img") && searchBarOpen) {
      $(".search-box").removeClass("onFocus");
      searchBarOpen = false;
    } else {
      $(".search-box").addClass("onFocus");
      searchBarOpen = true;
    }
  }
  return;
});

//關閉 search input
//寬度小於 1200 時 不是點擊search input or search icon 就會關閉 search input
$("body").on("mouseup touchend", function (e) {
  if ($("body").width() < 1200) {
    if (
      !e.target.matches(".search-icon") ||
      !e.target.matches(".search-input")
    ) {
      $(".search-box").removeClass("onFocus");
      searchBarOpen = false;
    }
  }
  return;
});
$(".btn-guide").on("click", function () {
  $(this).parents("li").toggleClass("on");
});

//表格篩選圖示 toggle 切換
sortHead.on("click", function () {
  $(this).toggleClass("sort-up");
});

// 二層選單控制
$(".double-lists li").on("click", function (e) {
  e.stopPropagation();
  $(this).toggleClass("active open");
  $(this)
    .siblings()
    .removeClass("active open")
    .find(".sub-lists li")
    .removeClass("active open");
});
// 三層選單控制
$(".triple-lists li").on("click", function (e) {
  e.stopPropagation();
  $(this).toggleClass("active open");
  $(this)
    .siblings()
    .removeClass("active open")
    .find(".sub-lists li")
    .removeClass("active open")
    .find(".third-lists li")
    .removeClass("active open");
});
$(".sub-lists li").on("click", function () {
  $(this).siblings().find(".third-lists li").removeClass("active open");
});
$(".third-lists li").on("click", function (e) {
  $(this).parents("li").removeClass("active");
});

//目前螢幕寬度
function checkScreenWidth() {
  if ($(window).width() > 1024) {
    return "desk";
  } else if ($(window).width() > 576 && $(window).height() > 420) {
    return "padPortrait"; //直
  } else if ($(window).width() > 768 && $(window).height() > 420) {
    return "padLandscape"; //橫
  } else if ($(window).height() < 420) {
    return "phone";
  } else {
    return "desk";
  }
}
//加入按鈕 more
function addMoreBtn(target) {
  if (target.data("hadmore") == false) {
    $(target).append(
      `<button class="more" data-seemore="false" title="查看更多按鈕" onclick="moreStatus($(this))">more +</button>`
    );
    target.data("hadmore", true);
  }
}
//more 狀況控制
function moreStatus(target) {
  const parents = target.parents(".countText");
  const counTextcontent = target.parents(".countText").find("p");
  const countRow = String(target.parents(".countText").data("rows"));
  if (target.data("seemore") == false) {
    target.text("more -");
    parents.removeClass("ellipsis");
    target.data("seemore", true);
  } else {
    target.text("more +");
    parents.addClass("ellipsis");
    target.data("seemore", false);
  }
}
//more 內容高度計算
function countTextNumber() {
  $(".countText p").each(function () {
    let parents = $(this).parents(".countText");
    switch (checkScreenWidth()) {
      case "desk":
        if ($(this).height() > 179.55) {
          parents.addClass("ellipsis");
          addMoreBtn(parents);
        }
        break;
      case "padPortrait":
        if ($(this).height() > 136) {
          parents.addClass("ellipsis");
          addMoreBtn(parents);
        }
        break;
      case "padLandscape":
        if ($(this).height() > 136) {
          parents.addClass("ellipsis");
          addMoreBtn(parents);
        }
        break;
      case "phone":
        if ($(this).height() > 136) {
          parents.addClass("ellipsis");
          addMoreBtn(parents);
        }
        break;
      default:
        if ($(this).height() > 179) {
          parents.addClass("ellipsis");
          addMoreBtn(parents);
        }
    }
  });
}
//連結數量計算
function countLinkRows() {
  let linkRows = $(".countRows .ex-link");
  let parents = $(".countRows");
  let maxRows = 5;
  if (linkRows.length > maxRows) {
    addMoreBtnForLinkRows(parents);
    linkRows.each(function (idx) {
      if (idx > maxRows - 1) {
        linkRows.eq(idx).addClass("dis-no");
      }
    });
  }
}
//加入按鈕 link more
function addMoreBtnForLinkRows(target) {
  if (target.data("hadmore") == false) {
    $(target).append(
      `<button class="more" data-seemore="false" title="查看更多按鈕" onclick="moreStatusForLinkRows($(this))">more +</button>`
    );
    target.data("hadmore", true);
  }
}
//連結 more 狀況控制
function moreStatusForLinkRows(target) {
  const counTextcontent = target.parents(".countRows").find(".ex-link");
  if (target.data("seemore") == false) {
    target.text("more -");
    counTextcontent.removeClass("dis-no");
    target.data("seemore", true);
  } else {
    target.text("more +");
    counTextcontent.each(function (idx) {
      if (idx > 4) {
        counTextcontent.eq(idx).addClass("dis-no");
      }
    });
    target.data("seemore", false);
  }
}

countTextNumber();
countLinkRows();
iswap();
// 瀏覽器 resize 時呼叫
$(window).on("resize", function () {
  countTextNumber();
  countLinkRows();
  iswap();
});
//裝置判斷
function iswap() {
  var uA = navigator.userAgent.toLowerCase();
  var ipad = uA.match(/ipad/i) == "ipad";
  var iphone = uA.match(/iphone os/i) == "iphone os";
  var midp = uA.match(/midp/i) == "midp";
  var uc7 = uA.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var uc = uA.match(/ucweb/i) == "ucweb";
  var android = uA.match(/android/i) == "android";
  var windowsce = uA.match(/windows ce/i) == "windows ce";
  var windowsmd = uA.match(/windows mobile/i) == "windows mobile";
  if ($(window).width() > 1200 && $(window).width() < 1400) {
    if (
      !(
        ipad ||
        iphone ||
        midp ||
        uc7 ||
        uc ||
        android ||
        windowsce ||
        windowsmd
      )
    ) {
      // PC 端
      $(".acc").removeClass("d-none");
    } else {
      // 移动端
      $(".acc").addClass("d-none");
    }
  } else {
    $(".acc").removeClass("d-none");
  }
}
