"use strict";(self.webpackChunksacko_shop=self.webpackChunksacko_shop||[]).push([[4026],{4026:(Z,R,h)=>{h.r(R),h.d(R,{startInputShims:()=>X});var A=h(9204),l=h(6639),T=h(1293),y=h(9522),p=h(7726);h(7243),h(1367),h(4514),h(1341);const b=new WeakMap,I=(e,t,s,o=0,r=!1)=>{b.has(e)!==s&&(s?k(e,t,o,r):G(e,t))},k=(e,t,s,o=!1)=>{const r=t.parentNode,n=t.cloneNode(!1);n.classList.add("cloned-input"),n.tabIndex=-1,o&&(n.disabled=!0),r.appendChild(n),b.set(e,n);const a="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${a}px,${s}px,0) scale(0)`},G=(e,t)=>{const s=b.get(e);s&&(b.delete(e),s.remove()),e.style.pointerEvents="",t.style.transform=""},C="input, textarea, [no-blur], [contenteditable]",W="$ionPaddingTimer",O=(e,t,s)=>{const o=e[W];o&&clearTimeout(o),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[W]=setTimeout(()=>{e.style.setProperty("--keyboard-offset","0px"),s&&s()},120)},j=(e,t,s)=>{e.addEventListener("focusout",()=>{t&&O(t,0,s)},{once:!0})};let g=0;const B="data-ionic-skip-scroll-assist",Q=(e,t,s,o,r,n,i,a=!1)=>{const v=n&&(void 0===i||i.mode===p.a.None);let m=!1;const c=void 0!==l.w?l.w.innerHeight:0,f=S=>{!1!==m?N(e,t,s,o,S.detail.keyboardHeight,v,a,c,!1):m=!0},u=()=>{m=!1,null==l.w||l.w.removeEventListener("ionKeyboardDidShow",f),e.removeEventListener("focusout",u)},L=function(){var S=(0,A.A)(function*(){t.hasAttribute(B)?t.removeAttribute(B):(N(e,t,s,o,r,v,a,c),null==l.w||l.w.addEventListener("ionKeyboardDidShow",f),e.addEventListener("focusout",u))});return function(){return S.apply(this,arguments)}}();return e.addEventListener("focusin",L),()=>{e.removeEventListener("focusin",L),null==l.w||l.w.removeEventListener("ionKeyboardDidShow",f),e.removeEventListener("focusout",u)}},K=e=>{document.activeElement!==e&&(e.setAttribute(B,"true"),e.focus())},N=function(){var e=(0,A.A)(function*(t,s,o,r,n,i,a=!1,v=0,m=!0){if(!o&&!r)return;const c=((e,t,s,o)=>{var r;return((e,t,s,o)=>{const r=e.top,n=e.bottom,i=t.top,v=i+15,c=Math.min(t.bottom,o-s)-50-n,f=v-r,u=Math.round(c<0?-c:f>0?-f:0),L=Math.min(u,r-i),D=Math.abs(L)/.3;return{scrollAmount:L,scrollDuration:Math.min(400,Math.max(150,D)),scrollPadding:s,inputSafeY:4-(r-v)}})((null!==(r=e.closest("ion-item,[ion-item]"))&&void 0!==r?r:e).getBoundingClientRect(),t.getBoundingClientRect(),s,o)})(t,o||r,n,v);if(o&&Math.abs(c.scrollAmount)<4)return K(s),void(i&&null!==o&&(O(o,g),j(s,o,()=>g=0)));if(I(t,s,!0,c.inputSafeY,a),K(s),(0,y.r)(()=>t.click()),i&&o&&(g=c.scrollPadding,O(o,g)),typeof window<"u"){let f;const u=function(){var S=(0,A.A)(function*(){void 0!==f&&clearTimeout(f),window.removeEventListener("ionKeyboardDidShow",L),window.removeEventListener("ionKeyboardDidShow",u),o&&(yield(0,T.c)(o,0,c.scrollAmount,c.scrollDuration)),I(t,s,!1,c.inputSafeY),K(s),i&&j(s,o,()=>g=0)});return function(){return S.apply(this,arguments)}}(),L=()=>{window.removeEventListener("ionKeyboardDidShow",L),window.addEventListener("ionKeyboardDidShow",u)};if(o){const S=yield(0,T.g)(o);if(m&&c.scrollAmount>S.scrollHeight-S.clientHeight-S.scrollTop)return"password"===s.type?(c.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",L)):window.addEventListener("ionKeyboardDidShow",u),void(f=setTimeout(u,1e3))}u()}});return function(s,o,r,n,i,a){return e.apply(this,arguments)}}(),X=function(){var e=(0,A.A)(function*(t,s){if(void 0===l.d)return;const o="ios"===s,r="android"===s,n=t.getNumber("keyboardHeight",290),i=t.getBoolean("scrollAssist",!0),a=t.getBoolean("hideCaretOnScroll",o),v=t.getBoolean("inputBlurring",!1),m=t.getBoolean("scrollPadding",!0),c=Array.from(l.d.querySelectorAll("ion-input, ion-textarea")),f=new WeakMap,u=new WeakMap,L=yield p.K.getResizeMode(),S=function(){var _=(0,A.A)(function*(d){yield new Promise(w=>(0,y.c)(d,w));const x=d.shadowRoot||d,M=x.querySelector("input")||x.querySelector("textarea"),P=(0,T.f)(d),F=P?null:d.closest("ion-footer");if(M){if(P&&a&&!f.has(d)){const w=((e,t,s)=>{if(!s||!t)return()=>{};const o=a=>{(e=>e===e.getRootNode().activeElement)(t)&&I(e,t,a)},r=()=>I(e,t,!1),n=()=>o(!0),i=()=>o(!1);return(0,y.a)(s,"ionScrollStart",n),(0,y.a)(s,"ionScrollEnd",i),t.addEventListener("blur",r),()=>{(0,y.b)(s,"ionScrollStart",n),(0,y.b)(s,"ionScrollEnd",i),t.removeEventListener("blur",r)}})(d,M,P);f.set(d,w)}if("date"!==M.type&&"datetime-local"!==M.type&&(P||F)&&i&&!u.has(d)){const w=Q(d,M,P,F,n,m,L,r);u.set(d,w)}}});return function(x){return _.apply(this,arguments)}}();v&&(()=>{let e=!0,t=!1;const s=document;(0,y.a)(s,"ionScrollStart",()=>{t=!0}),s.addEventListener("focusin",()=>{e=!0},!0),s.addEventListener("touchend",i=>{if(t)return void(t=!1);const a=s.activeElement;if(!a||a.matches(C))return;const v=i.target;v!==a&&(v.matches(C)||v.closest(C)||(e=!1,setTimeout(()=>{e||a.blur()},50)))},!1)})();for(const _ of c)S(_);l.d.addEventListener("ionInputDidLoad",_=>{S(_.detail)}),l.d.addEventListener("ionInputDidUnload",_=>{(_=>{if(a){const d=f.get(_);d&&d(),f.delete(_)}if(i){const d=u.get(_);d&&d(),u.delete(_)}})(_.detail)})});return function(s,o){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=4026.98593e755ad6aa03.js.map