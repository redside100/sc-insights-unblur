// ==UserScript==
// @name         Soundcloud Insights Unblur
// @description  Unblurs Insights list elements
// @version      0.1
// @author       You
// @match        https://insights-ui.soundcloud.com/*
// @grant        none
// ==/UserScript==

// from https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
var observeDOM = (function () {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function (obj, callback) {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe for changes in children
      mutationObserver.observe(obj, { childList: true, subtree: true })
      return mutationObserver
    }

    // browser support fallback
    else if (window.addEventListener) {
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()

const unblur = () => {
  const listElements = document.getElementsByTagName("li");
  for (let i = 0; i < listElements.length; i++) {
    if (listElements[i].className.includes("Blur")) {
      listElements[i].className = listElements[i].className.replace(/[0-9A-Za-z_]*Blur[0-9A-Za-z_]*/, "");
    }
  }
}

const body = document.querySelector("body");
observeDOM(body, unblur);