---
title: Supabase Schema
description: Backend schema and policies used by Bud's Bunker
sidebar_label: Supabase Schema
tags: [supabase, schema, database]
---

# Supabase Schema for Bud's Bunker

This document defines the initial Supabase backend setup, including the `characters` table, its structure, row-level security, and access policies.

---

## Characters Table

```sql
CREATE TABLE characters (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users NOT NULL,
  display_name text,
  stats       jsonb,
  created_at  timestamp DEFAULT now()
);
