"use strict";(self.webpackChunkbunker=self.webpackChunkbunker||[]).push([[7582],{530:(e,r,t)=>{t.r(r),t.d(r,{default:()=>u});var o=t(6540),i=t(6347),s=t(5286),n=t(3198),a=t(4848);function u(){const e=(0,i.W6)(),[r,t]=(0,o.useState)("Checking email confirmation...");return(0,o.useEffect)((()=>{(async()=>{try{const{error:r}=await s.N.auth.getSessionFromUrl();if(r)throw r;const{data:{user:o},error:i}=await s.N.auth.getUser();if(i||!o)throw new Error("Could not retrieve user after session restoration");t("\u2705 Email confirmed! Redirecting to your profile..."),setTimeout((()=>{e.push(`${n.C1}/profile`)}),2e3)}catch(r){console.error("[Email Confirm Error]",r),t("\u274c Confirmation failed. Please sign in manually."),setTimeout((()=>{e.push(`${n.C1}/auth-test`)}),3e3)}})()}),[e]),(0,a.jsx)("div",{style:{padding:"2rem"},children:(0,a.jsx)("h2",{children:r})})}},3198:(e,r,t)=>{t.d(r,{C1:()=>o,kg:()=>i});const o="/buds_bunker",i=`https://doubleobud.github.io${o}`}}]);