"use strict";(self.webpackChunkbunker=self.webpackChunkbunker||[]).push([[7875],{112:(e,r,t)=>{t.d(r,{N:()=>i});const n="https://woqkezopnodqylfjhagq.supabase.co",s="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcWtlem9wbm9kcXlsZmpoYWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE1OTksImV4cCI6MjA1OTc5NzU5OX0.2k_UQ3iL7794EtqMCfA0NGjjdu8yQn4xQPtnoQFK-Pg";const i=(0,t(6017).UU)(n,s)},4769:(e,r,t)=>{t.r(r),t.d(r,{default:()=>l});var n=t(6540),s=t(1410),i=t(6347),a=t(112);var o=t(4848);function c(){const[e,r]=(0,n.useState)(""),[t,s]=(0,n.useState)(""),[c,l]=(0,n.useState)(null),[u,h]=(0,n.useState)(""),d=(0,i.W6)();return(0,o.jsxs)("div",{style:{padding:"1rem",border:"1px solid #444"},children:[(0,o.jsx)("h2",{children:"\ud83e\uddea Auth Panel"}),!c&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("input",{type:"email",placeholder:"Email",value:e,onChange:e=>r(e.target.value),style:{display:"block",marginBottom:"0.5rem"}}),(0,o.jsx)("input",{type:"password",placeholder:"Password",value:t,onChange:e=>s(e.target.value),style:{display:"block",marginBottom:"0.5rem"}}),(0,o.jsx)("button",{onClick:async()=>{try{const{error:r}=await async function(e,r){const{data:t,error:n}=await a.N.auth.signUp({email:e,password:r,options:{emailRedirectTo:"http://localhost:3000/buds_bunker/email-confirm"}});if(n)throw n;return t}(e,t);if(r)throw r;h("\u2705 Sign-up successful! Please check your email to confirm your account before signing in.")}catch(r){console.error(r),h(`Sign-up error: ${r.message}`)}},children:"Sign Up"}),(0,o.jsx)("button",{onClick:async()=>{try{const{user:r,error:n}=await async function(e,r){const{data:t,error:n}=await a.N.auth.signInWithPassword({email:e,password:r});if(n)throw n;return t}(e,t);if(n)throw n;l(r),h("Signed in! Creating character..."),await async function(e){const{error:r}=await a.N.from("characters").insert({user_id:e,display_name:"New Adventurer",stats:{health:100,stamina:50,keywords:[],level:1}});if(r)throw r}(r.id),h("Character created! Redirecting to profile..."),setTimeout((()=>{d.push("/profile")}),2e3)}catch(r){console.error(r),h(`Sign-in error: ${r.message}`)}},style:{marginLeft:"0.5rem"},children:"Sign In"})]}),c&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("p",{children:["\ud83d\udc64 Logged in as: ",c.email]}),(0,o.jsx)("button",{onClick:async()=>{try{const{error:e}=await async function(){const{error:e}=await a.N.auth.signOut();if(e)throw e}();if(e)throw e;l(null),h("Signed out.")}catch(e){console.error(e),h(`Sign-out error: ${e.message}`)}},children:"Sign Out"})]}),u&&(0,o.jsx)("p",{style:{marginTop:"1rem"},children:u})]})}function l(){return(0,o.jsx)(s.A,{title:"Auth Test",children:(0,o.jsxs)("main",{style:{padding:"2rem"},children:[(0,o.jsx)("h1",{children:"\ud83d\udd10 Auth Test Page"}),(0,o.jsx)("p",{children:"This is a test page for signing up and managing user sessions. For some reason it does not show up"}),(0,o.jsx)(c,{})]})})}}}]);