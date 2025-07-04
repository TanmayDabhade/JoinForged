## 📄 PRD: **Forged – Cofounder Matching Platform** (Cursor Build-Ready, Gemini Version)

### ✅ **Goal**

Ship a clean MVP of *Forged* in **1 day** using **Next.js**, **Clerk** (auth), **Supabase** (data), and **Gemini** (matching AI).
Let users complete onboarding, view AI-ranked matches, and send/accept connection requests (no messaging for now).

---

## 🧱 Tech Stack

| Layer     | Tool                              |
| --------- | --------------------------------- |
| Framework | Next.js (App Router)              |
| Styling   | Tailwind CSS + Shadcn/Tweakcn     |
| Auth      | Clerk                             |
| Database  | Supabase                          |
| AI        | **Google Gemini (Generative AI)** |
| Hosting   | Vercel                            |

---

## 📌 Features

### 🔐 1. **Authentication (Clerk)**

* Email/password and Google sign-in.
* Store Clerk `user_id` and email in Supabase for user profile linkage.

---

### 🧾 2. **Multi-step Onboarding Form**

**Route:** `/onboarding`
Store in Supabase `profiles` table:

```ts
type UserProfile = {
  user_id: string;            // Clerk ID
  name: string;
  email: string;
  role: 'technical' | 'non-technical' | 'designer' | 'product';
  skills: string[];           // tag + custom input
  commitment: 'part-time' | 'full-time';
  values: string[];           // pick 3 from list
  motivation: string;         // open text
  communication: 'sync' | 'async';
  industry: string;
  timezone: string;
  availability: number;       // hours/week
  linkedin: string;
  github?: string;
  personal_site?: string;
  created_at: timestamp;
}
```

Redirect users to `/onboarding` until complete.

---

### ⚙️ 3. **AI Matching Engine (Gemini)**

**Trigger:** Server route or cron job (manual for MVP)

**Logic:**

* Fetch all profiles (excluding self)
* For each user, pair with all others
* Send both profiles to **Gemini** with a prompt (see below)
* Get:

  * Match score (0–100)
  * AI summary text (1–2 lines)

**Store in** `matches` table:

```ts
type Match = {
  user_id: string;
  match_id: string;
  score: number;
  ai_summary: string;
  created_at: timestamp;
}
```

---

### 🧠 Gemini Prompt Template (for each pair):

> Compare these two startup founders to see if they'd be a strong cofounding team.
> Return:

* A compatibility score (0–100)
* A 1–2 sentence summary explaining why.

Consider:

* Complementary roles and skills
* Shared values and motivation
* Matching time commitment and communication style
* Industry overlap

---

### 📊 4. **Dashboard UI**

**Route:** `/dashboard`

* Display top matches (score ≥ 60) as cards
* Card contents:

  * Name, role, industry, timezone
  * Skill tags
  * Compatibility % and AI summary
  * \[Send Connection Request] or \[Skip]

---

### 🔗 5. **Connection Requests**

**Route:** `/connections`
**Table:** `connection_requests`

```ts
type ConnectionRequest = {
  sender_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: timestamp;
}
```

* No chat — show **email + links only after acceptance**
* Prevent duplicate requests

---

### 📬 6. **(Optional)** Weekly Match Email Summary

If time allows, email 3–5 top matches every Monday using Resend/Mailgun.

---

## 🧠 UI/UX Rules for Cursor

* Use **Shadcn**: `Card`, `Avatar`, `Badge`, `Tabs`, `Form`, `Button`
* Use **Tailwind** + `@/components/ui`
* Layout:

  * `/onboarding`
  * `/dashboard`
  * `/connections`
  * `/profile` (optional)
* **Minimal** + dark mode aesthetic
* Fonts: Geist Sans or Inter

---

## 🧪 Testing Checklist

* [ ] Auth + Onboarding complete redirect logic
* [ ] Supabase profile write + read
* [ ] Gemini matching works (scores + blurbs)
* [ ] Dashboard renders matches by score
* [ ] Requests update status (pending → accepted)
* [ ] Show contact info after accept

---

## ⏱️ Day Plan (Ship Fast)

| Time   | Task                                         |
| ------ | -------------------------------------------- |
| 0–2 hr | Clerk auth + Supabase schema + onboarding UI |
| 2–4 hr | Store profiles + dashboard layout            |
| 4–6 hr | Match engine + Gemini prompt integration     |
| 6–8 hr | Connection requests + email reveal logic     |
| 8–10hr | Final polish, dark mode, deploy to Vercel    |

---

## 🧭 Database Tables (Supabase)

* `profiles`
* `matches`
* `connection_requests`

---
