"use strict";(self.webpackChunkbunker=self.webpackChunkbunker||[]).push([[4787],{1807:(t,e,s)=>{s.d(e,{A:()=>o});s(6540);var a=s(3523),r=s(3953),n=s(9303);const l={tag:"tag_Nnez"};var c=s(4848);function i(t){let{letterEntry:e}=t;return(0,c.jsxs)("article",{children:[(0,c.jsx)(n.A,{as:"h2",id:e.letter,children:e.letter}),(0,c.jsx)("ul",{className:"padding--none",children:e.tags.map((t=>(0,c.jsx)("li",{className:l.tag,children:(0,c.jsx)(r.A,{...t})},t.permalink)))}),(0,c.jsx)("hr",{})]})}function o(t){let{tags:e}=t;const s=(0,a.Q)(e);return(0,c.jsx)("section",{className:"margin-vert--lg",children:s.map((t=>(0,c.jsx)(i,{letterEntry:t},t.letter)))})}},3523:(t,e,s)=>{s.d(e,{Q:()=>n,b:()=>r});var a=s(539);const r=()=>(0,a.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function n(t){const e={};return Object.values(t).forEach((t=>{const s=function(t){return t[0].toUpperCase()}(t.label);e[s]??=[],e[s].push(t)})),Object.entries(e).sort(((t,e)=>{let[s]=t,[a]=e;return s.localeCompare(a)})).map((t=>{let[e,s]=t;return{letter:e,tags:s.sort(((t,e)=>t.label.localeCompare(e.label)))}}))}},3775:(t,e,s)=>{s.r(e),s.d(e,{default:()=>d});s(6540);var a=s(4164),r=s(1082),n=s(204),l=s(3523),c=s(1807),i=s(7220),o=s(9303),g=s(4848);function u(t){let{title:e}=t;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(r.be,{title:e}),(0,g.jsx)(i.A,{tag:"doc_tags_list"})]})}function h(t){let{tags:e,title:s}=t;return(0,g.jsx)(r.e3,{className:(0,a.A)(n.G.page.docsTagsListPage),children:(0,g.jsx)("div",{className:"container margin-vert--lg",children:(0,g.jsx)("div",{className:"row",children:(0,g.jsxs)("main",{className:"col col--8 col--offset-2",children:[(0,g.jsx)(o.A,{as:"h1",children:s}),(0,g.jsx)(c.A,{tags:e})]})})})})}function d(t){const e=(0,l.b)();return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(u,{...t,title:e}),(0,g.jsx)(h,{...t,title:e})]})}},3953:(t,e,s)=>{s.d(e,{A:()=>c});s(6540);var a=s(4164),r=s(6289);const n={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var l=s(4848);function c(t){let{permalink:e,label:s,count:c,description:i}=t;return(0,l.jsxs)(r.A,{href:e,title:i,className:(0,a.A)(n.tag,c?n.tagWithCount:n.tagRegular),children:[s,c&&(0,l.jsx)("span",{children:c})]})}}}]);