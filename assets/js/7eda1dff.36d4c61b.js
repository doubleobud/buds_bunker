"use strict";(self.webpackChunkbunker=self.webpackChunkbunker||[]).push([[6845],{4610:(e,t,r)=>{r.d(t,{CE:()=>n,gi:()=>o,t9:()=>i});var a=r(5286);const s={version:"v1",level:1,health:100,stamina:50,keywords:[],tutorial_complete:!1,codex_unlocked:!1,faction_board_unlocked:!1};async function n(){const{data:{session:e}}=await a.N.auth.getSession(),t=e?.user;if(!t)throw new Error("Not authenticated");const{data:r,error:n}=await a.N.from("characters").select().eq("user_id",t.id).maybeSingle();if(n)throw console.error("[character] Fetch error:",n.message),n;if(r)return r;const o=String(Math.floor(1e5+9e5*Math.random())),{data:i,error:c}=await a.N.from("characters").insert({user_id:t.id,user_id_number:o,stats:s}).select().single();if(c)throw console.error("[character] Insert error:",c.message),c;return i}async function o(){const{data:{session:e}}=await a.N.auth.getSession(),t=e?.user;if(!t)throw new Error("Not authenticated");const{data:r,error:s}=await a.N.from("characters").select().eq("user_id",t.id).maybeSingle();if(s)throw console.error("[character] Get error:",s.message),s;return r}async function i(e){const{data:{session:t}}=await a.N.auth.getSession(),r=t?.user;if(!r)throw new Error("Not authenticated");const{data:s,error:n}=await a.N.from("characters").update(e).eq("user_id",r.id).select().single();if(n)throw n;return{data:s,error:n}}},8656:(e,t,r)=>{r.r(t),r.d(t,{default:()=>x});var a=r(6540),s=r(1410),n=r(5286),o=r(4610),i=r(4848);function c(){return(0,i.jsx)("div",{style:{textAlign:"center",padding:"2rem"},children:(0,i.jsx)("p",{children:"Loading\u2026"})})}var l=r(2925),u=r(6347),d=r(9030);const h=e=>{let{steps:t}=e;const[r,s]=(0,a.useState)(null),n=((0,u.W6)(),(0,d.Ay)("/timeline/origin"));(0,a.useEffect)((()=>{if(!t||0===t.length)return;const e=new l.A.Tour({defaultStepOptions:{cancelIcon:{enabled:!0},scrollTo:{behavior:"smooth",block:"center"},classes:"shepherd-theme-arrows"},useModalOverlay:!0});return t.forEach(((r,a)=>{e.addStep({...r,buttons:o(e,a,t.length)})})),s(e),localStorage.getItem("tour-profile-seen")||(e.start(),localStorage.setItem("tour-profile-seen","true")),()=>{e.cancel()}}),[t]);const o=(e,t,r)=>{const a=[];return t>0&&a.push({text:"Back",action:e.back}),t<r-1?a.push({text:"Next",action:e.next}):a.push({text:"Done",action:e.complete}),a};return(0,i.jsxs)("div",{className:"text-right mb-4 flex items-center justify-end space-x-2",children:[(0,i.jsx)("button",{"data-tour":"continue-narrative",className:"btn btn-outline",onClick:()=>{window.location.href=n},type:"button",children:"\ud83d\udcd8 Continue Narrative"}),(0,i.jsx)("button",{"data-tour":"show-tour",onClick:()=>{r&&(localStorage.removeItem("tour-profile-seen"),r.start())},className:"btn btn-outline",type:"button",children:"\ud83d\udcd8 Show Tour Again"})]})};var m=r(1289);const b=()=>String(Math.floor(1e5+9e5*Math.random()));function x(){const[e,t]=(0,a.useState)(null),[r,l]=(0,a.useState)(null),[u,d]=(0,a.useState)(!0),[x,f]=(0,a.useState)(null),[g,p]=(0,a.useState)(""),[w,y]=(0,a.useState)(""),[N,j]=(0,a.useState)(null),[v,S]=(0,a.useState)(!1),{unlocks:_,loading:k}=(0,m.F)();(0,a.useEffect)((()=>{(async()=>{const{data:e}=await n.N.auth.getSession();e?.session&&t(e.session)})();const{data:e}=n.N.auth.onAuthStateChange(((e,r)=>t(r)));return()=>e.subscription.unsubscribe()}),[]),(0,a.useEffect)((()=>{e&&(async()=>{try{let e=await(0,o.gi)();if(!e&&(await(0,o.CE)(),e=await(0,o.gi)(),!e))throw new Error("Failed to create character.");if(!e.user_id_number){const t=b();await(0,o.t9)({user_id_number:t}),e.user_id_number=t}l(e),p(e.user_id_number)}catch(e){f(e.message)}finally{d(!1)}})()}),[e]),(0,a.useEffect)((()=>{u||x||!r||S(!0)}),[u,x,r]);return e?u||k?(0,i.jsx)(s.A,{title:"Identity Center",children:(0,i.jsx)("div",{className:"flex justify-center mt-12",children:(0,i.jsx)(c,{})})}):x?(0,i.jsx)(s.A,{title:"Identity Center",children:(0,i.jsxs)("p",{className:"text-center text-red-600 mt-12 text-lg",children:["Error: ",x]})}):(0,i.jsxs)(s.A,{title:"Identity Center",children:[v&&(0,i.jsx)(h,{steps:[{attachTo:{element:'[data-tour="id-number"]',on:"right"},title:"ID Number",text:["This 6\u2011digit ID is auto\u2011generated.","You can replace it with any unused number."],classes:"shepherd-theme-arrows",scrollTo:!0},{attachTo:{element:'[data-tour="stats-message"]',on:"bottom"},title:"Character Attributes",text:["Attributes you acquire will appear here once you start progressing."],classes:"shepherd-theme-arrows",scrollTo:!0},{attachTo:{element:'[data-tour="continue-narrative"]',on:"bottom"},title:"Continue Narrative",text:["Click to jump into the next chapter of the story."],classes:"shepherd-theme-arrows",scrollTo:!0},{attachTo:{element:'[data-tour="show-tour"]',on:"bottom"},title:"Show Tour Again",text:["Replay this tutorial any time."],classes:"shepherd-theme-arrows",scrollTo:!0}]}),(0,i.jsxs)("main",{className:"max-w-3xl mx-auto px-6 pt-12 pb-20 space-y-12",children:[(0,i.jsx)("h1",{className:"text-4xl font-extrabold tracking-tight",children:"User Profile"}),(0,i.jsxs)("section",{className:"bg-[#fdfcf5] border border-gray-200 shadow-md rounded-xl p-6 space-y-4","data-tour":"id-number",children:[(0,i.jsx)("h2",{className:"text-xl font-semibold border-b pb-2",children:"Your ID Number"}),(0,i.jsxs)("div",{className:"flex flex-wrap gap-2 items-center",children:[(0,i.jsx)("input",{className:"input flex-grow min-w-[140px]",value:g,onChange:e=>p(e.target.value),placeholder:"6-digit number"}),(0,i.jsx)("button",{className:"btn btn-info",onClick:async()=>{if(!/^[0-9]{6}$/.test(g))return j(!1),void y("Enter a valid 6\u2011digit number.");const{data:e,error:t}=await n.N.from("characters").select("id").eq("user_id_number",g);if(t)return j(!1),void y("Error checking availability.");const a=e.some((e=>e.id!==r.id));j(!a),y(a?"Number already in use.":"Number is available!")},children:"Check"}),(0,i.jsx)("button",{className:"btn btn-primary disabled:opacity-50",disabled:!N,onClick:async()=>{if(N)try{await(0,o.t9)({user_id_number:g}),l((e=>({...e,user_id_number:g}))),y("ID saved.")}catch{y("Save failed, try again.")}},children:"Save ID"})]}),w&&(0,i.jsx)("p",{className:N?"success-message":"error-message",children:w})]}),(0,i.jsxs)("section",{className:"bg-[#fdfcf5] border border-gray-200 shadow-md rounded-xl p-6",children:[(0,i.jsx)("h2",{className:"text-xl font-semibold border-b pb-2",children:"Character Stats"}),_?.profile_extended?(0,i.jsx)("div",{"data-tour":"stats",children:(0,i.jsx)("p",{className:"text-gray-700",children:"[Stats table coming soon]"})}):(0,i.jsx)("p",{className:"italic text-gray-600","data-tour":"stats-message",children:"You haven\u2019t earned any stats yet. Keep progressing to unlock them."})]})]})]}):(0,i.jsx)(s.A,{title:"Identity Center",children:(0,i.jsx)("p",{className:"text-center mt-12 text-lg",children:"\u26a0\ufe0f Please sign in first."})})}}}]);