/* 몽글몽글필름 공통 스크립트 · 상단바 고정 표시 · 신청서 주소 · 사례 영상 자동재생(화면에 보일 때만) */
(function(){
  var FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdxR4L8s3puOsHWoJDAqCcMkwpM8zerFNZR3A2AEuTzVX4gvA/viewform";
  document.querySelectorAll("a[data-form]").forEach(function(a){
    a.href = FORM_URL; a.target = "_blank"; a.rel = "noopener"; a.removeAttribute("data-todo");
  });

  // 상단바: 스크롤하면 배경이 살짝 불투명해져요
  var top = document.querySelector("header.top");
  if(top){
    var onScroll = function(){ top.classList.toggle("scrolled", (window.scrollY || document.documentElement.scrollTop) > 8); };
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
  }

  // 사례 영상: 소리 없이 화면에 보일 때만 재생 · 움직임 줄이기 설정이면 재생 단추를 보여요
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var vids = [].slice.call(document.querySelectorAll("video[data-case]"));
  if(calm || !("IntersectionObserver" in window)){
    vids.forEach(function(v){ v.controls = true; });
  } else {
    var io = new IntersectionObserver(function(list){
      list.forEach(function(en){
        var v = en.target;
        if(en.isIntersecting && !document.hidden){ var p = v.play(); if(p && p.catch) p.catch(function(){}); }
        else { v.pause(); }
      });
    }, {threshold:0.35});
    vids.forEach(function(v){ io.observe(v); });
    document.addEventListener("visibilitychange", function(){ if(document.hidden) vids.forEach(function(v){ v.pause(); }); });
  }
})();
