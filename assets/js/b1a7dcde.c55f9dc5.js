"use strict";(self.webpackChunkbunker=self.webpackChunkbunker||[]).push([[7582],{112:(e,i,n)=>{n.d(i,{N:()=>c});const t="https://woqkezopnodqylfjhagq.supabase.co",s="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcWtlem9wbm9kcXlsZmpoYWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE1OTksImV4cCI6MjA1OTc5NzU5OX0.2k_UQ3iL7794EtqMCfA0NGjjdu8yQn4xQPtnoQFK-Pg";const c=(0,n(6017).UU)(t,s)},530:(e,i,n)=>{n.r(i),n.d(i,{default:()=>a});var t=n(6540),s=n(6347),c=n(112),r=n(4848);function a(){const e=(0,s.W6)(),[i,n]=(0,t.useState)("Checking email confirmation...");return(0,t.useEffect)((()=>{(async()=>{const{data:{user:i},error:t}=await c.N.auth.getUser();if(t||!i)return n("Email confirmation link is expired or invalid. Please sign in manually."),void setTimeout((()=>{e.push("/auth-test")}),3e3);n("\u2705 Email confirmed! Redirecting to your profile..."),setTimeout((()=>{e.push("/profile")}),2e3)})()}),[e]),(0,r.jsx)("div",{style:{padding:"2rem"},children:(0,r.jsx)("h2",{children:i})})}}}]);