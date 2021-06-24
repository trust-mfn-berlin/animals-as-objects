// https://github.com/Robbendebiene/Sliding-Scroll

import Vue from "vue"

if (!Vue.scrollTopMixin) {
Vue.scrollTopMixin = true
Vue.mixin({
methods:{
  /*
 * y: the y coordinate to scroll, 0 = top
 * duration: scroll duration in milliseconds; default is 0 (no transition)
 * element: the html element that should be scrolled ; default is the main scrolling element
 */
  scrollToY (y, duration = 0, element = document.scrollingElement) {
  // cancel if already on target position
  if (element.scrollTop === y) return;

  const cosParameter = (element.scrollTop - y) / 2;
  let scrollCount = 0, oldTimestamp = null;

  function step (newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollCount will be Infinity
      scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
      if (scrollCount >= Math.PI) return element.scrollTop = y;
      element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
  },

  /*
  * duration: scroll duration in milliseconds; default is 0 (no transition)
  * this function is using the scrollToY function
  */
  scrollToTop(duration = 0) {
    this.scrollToY(0, duration, document.scrollingElement);
  },

  /*
  * id: the id of the element as a string that should be scrolled to
  * duration: scroll duration in milliseconds; default is 0 (no transition)
  * this function is using the scrollToY function on the main scrolling element
  */
  scrollToId(id, duration = 0) {
    const offset = Math.round(document.getElementById(id).getBoundingClientRect().top);
    this.scrollToY(document.scrollingElement.scrollTop + offset, duration);
  },

  /*
  * element: the node object that should be scrolled to
  * duration: scroll duration in milliseconds; default is 0 (no transition)
  * this function is using the scrollToY function on the main scrolling element
  */
  scrollToElement(element, duration = 0, paddingOffset = 0, scrollElement) {
    const offset = Math.round(element.getBoundingClientRect().top) + paddingOffset;
    if(scrollElement){
      this.scrollToY(scrollElement.scrollTop + offset, duration, scrollElement);
    } else {
      this.scrollToY(document.scrollingElement.scrollTop + offset, duration, scrollElement);
    }
  } 
}
})
}


/* 
Explanation:
- pi is the length/end point of the cosinus intervall (see below)
- newTimestamp indicates the current time when callbacks queued by requestAnimationFrame begin to fire.
  (for more information see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- newTimestamp - oldTimestamp equals the delta time

  a * cos (bx + c) + d                        | c translates along the x axis = 0
= a * cos (bx) + d                            | d translates along the y axis = 1 -> only positive y values
= a * cos (bx) + 1                            | a stretches along the y axis = cosParameter = window.scrollY / 2
= cosParameter + cosParameter * (cos bx)  | b stretches along the x axis = scrollCount = Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
= cosParameter + cosParameter * (cos scrollCount * x)
*/

// https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
