"use strict";(self.webpackChunkbunker=self.webpackChunkbunker||[]).push([[7582],{112:(e,i,t)=>{t.d(i,{N:()=>c});const n="https://woqkezopnodqylfjhagq.supabase.co",s="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcWtlem9wbm9kcXlsZmpoYWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE1OTksImV4cCI6MjA1OTc5NzU5OX0.2k_UQ3iL7794EtqMCfA0NGjjdu8yQn4xQPtnoQFK-Pg";const c=(0,t(6017).UU)(n,s)},530:(e,i,t)=>{t.r(i),t.d(i,{default:()=>a});var n=t(6540),s=t(6347),c=t(112),o=t(3198),r=t(4848);function a(){const e=(0,s.W6)(),[i,t]=(0,n.useState)("Checking email confirmation...");return(0,n.useEffect)((()=>{(async()=>{const{data:{user:i},error:n}=await c.N.auth.getUser();if(n||!i)return t("Email confirmation link is expired or invalid. Please sign in manually."),void setTimeout((()=>{e.push(`${o.C1}/auth-test`)}),3e3);t("\u2705 Email confirmed! Redirecting to your profile..."),setTimeout((()=>{e.push(`${o.C1}/profile`)}),2e3)})()}),[e]),(0,r.jsx)("div",{style:{padding:"2rem"},children:(0,r.jsx)("h2",{children:i})})}},3198:(e,i,t)=>{t.d(i,{C1:()=>n,mL:()=>s});const n="/buds_bunker",s=`http://localhost:3000${n}`}}]);