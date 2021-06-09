import Vue from "vue"

if (!Vue.scrollTopMixin) {
  Vue.scrollTopMixin = true
  Vue.mixin({
    methods:{
      scrollToTop (duration) {
        // cancel if already on top
        if (document.scrollingElement.scrollTop === 0) return;
      
        const cosParameter = document.scrollingElement.scrollTop / 2;
        let scrollCount = 0, oldTimestamp = null;
      
        function step (newTimestamp) {
            if (oldTimestamp !== null) {
                // if duration is 0 scrollCount will be Infinity
                scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
                if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
                document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
            }
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
      }
    }
  }) // Set up your mixin then
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