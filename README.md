# READS

**Reading for Evidence And Disciplinary Science**

An intelligent tutoring system (ITS) for science reading with 9th-grade students. READS uses four omnibus short-story episodes to build **prior knowledge** (amount, accuracy, specificity, coherence) and **scientific disciplinary literacy** (evidence–claim, variable control, uncertainty, graphs/tables, source credibility).

---

## Research Background & Design

### 1. Prior Knowledge and Comprehension

Reading comprehension research consistently shows that **prior knowledge** is one of the strongest predictors of comprehension. When readers have knowledge related to the topic, they generate inferences more effectively, integrate information, and build coherent mental representations of the content (Construction-Integration model; Kintsch, 1988). Recent work treats prior knowledge as **multidimensional**: amount, accuracy, specificity, and coherence of knowledge structures all affect comprehension and learning (McCarthy & McNamara, 2021). Scenario-based assessments show that both domain and topic-specific knowledge predict comprehension and learning in science reading, with interactions between the two (McCarthy et al., 2018; McCarthy et al., 2023). A central research question is what kinds of **pre-reading experiences** best activate or build prior knowledge that supports comprehension.

### 2. Narrative as a Mechanism for Activating Prior Knowledge

**Narrative texts** are a promising way to introduce scientific concepts and contexts. Narratives organize information through causal chains, characters, and events, which align with how people naturally remember and reason (Dahlstrom, 2014). They can make complex scientific ideas more accessible and memorable. Empirical work shows that narrative picture books and story-based interventions support science learning and transfer (e.g., Ganea et al., 2011; Kelemen et al., 2014). Narrative explanations support scientific understanding by linking events through **causal mechanisms** (Norris et al., 2005). Thus **narrative exposure can act as a knowledge-activation mechanism**, preparing readers to use that knowledge when they later read expository texts.

### 3. Disciplinary Literacy and Scientific Reasoning

**Disciplinary literacy** emphasizes that different fields require different reading and reasoning practices. In science, readers must evaluate evidence, understand causal mechanisms, and integrate information across sources (Goldman et al., 2016; Shanahan & Shanahan, 2008). Recent frameworks include source literacy, analytic literacy, and expressive literacy (Spires et al., 2018). Activities such as **self-explanation** and explanatory retrieval improve comprehension and retention of scientific text by encouraging active processing and integration (McCarthy & Hinze, 2021; McCarthy et al., 2025). Learning environments that combine **knowledge activation with explanatory reasoning** may therefore support scientific disciplinary literacy.

### 4. Purpose of the Study and READS Design

The study examines whether **narrative exposure activates prior knowledge** that supports comprehension of scientific texts and **scientific disciplinary literacy**. READS implements a multi-phase design:

| Phase | Description | Implementation in READS |
|-------|-------------|--------------------------|
| **(a) Narrative episode** | A short story presenting a scientific problem scenario | Four omnibus episodes (1–4); one episode per session |
| **(b) Prior knowledge activation & assessment** | Build and check knowledge after the narrative | Anchoring questions (6), self-explanation prompts (2), mini-lesson, confirmation quiz (4) with feedback |
| **(c) Expository science texts** | Multiple texts providing relevant evidence | Mini-lessons in-session; optional expansion to fuller expository sets |
| **(d) Comprehension tasks** | Measure factual and inferential understanding | In-session quiz with rubric-based scoring; pre/post knowledge tests and comprehension items |
| **(e) Scenario-based tasks** | Assess disciplinary literacy and problem-solving | Disciplinary focus woven across episodes; post survey and scenario/essay tasks (e.g. `/scenario`, `/reading-comprehension`) |

**Prior knowledge dimensions** are emphasized by episode: Episode 1 — *amount* (ecosystem terms and structure); Episode 2 — *accuracy* (correct concepts and relations); Episode 3 — *specificity* (concrete examples and data); Episode 4 — *coherence* (linking concepts, evidence, and claims). **Disciplinary literacy** is addressed through (a) evidence–claim linking, (b) variable/method control, (c) uncertainty and alternative explanations, (d) graphs and tables, (e) source and evidence quality. Session-level logs (responses, scores, time on task, self-explanations) and pre/post measures (knowledge test, survey, comprehension) support analysis of prior-knowledge growth and disciplinary literacy outcomes.

---

## System Structure (In Detail)

### Overview

- **Target**: 9th-grade (middle-school) students  
- **Episodes**: 4 omnibus short stories, shared “ecological observation” setting  
- **Time**: ~25–35 minutes per session, 4 sessions total  
- **Science domain**: Ecology and climate (ecosystem components, interactions, climate impact, data-based reasoning)  
- **Content language**: Korean (student-facing); structure and logs are English-friendly for research.

### Episode Design (Four Episodes)

Each episode is a **short story** that does not teach science directly; it presents a situation and characters’ actions. Learning is elicited through **self-explanation** and anchoring questions. Episodes share one world (place, characters, project) but different events (omnibus).

| Episode | Title (example) | Science concepts | Disciplinary focus | Knowledge focus |
|---------|----------------|------------------|--------------------|-----------------|
| **1** | *Ocean smell* (바다 냄새) | Observation, pattern recognition, recording | (a) Evidence–claim linking; systematic observation | **Amount**: ecosystem/observation vocabulary |
| **2** | *The restaurant menu* (식당의 메뉴판) | Survey methods, sample, variables, measurement | (b) Variable/method control; (d) table interpretation | **Accuracy**: correct concepts and relations |
| **3** | *The ledger list* (장부 속의 목록) | Climate change, habitat/population change, correlation vs cause | (c) Uncertainty and alternative explanations | **Specificity**: concrete examples and data |
| **4** | *The order of the sea* (바다의 순서) | Source of scientific information, evidence quality, graphs/reports | (e) Source/evidence quality; (d) graph interpretation | **Coherence**: linking concepts, evidence, claims |

### Session Flow (Per Episode)

Designed sequence per 25–35 minute session:

| Step | Activity | Approx. time |
|------|----------|--------------|
| **Introduction** | Session goals; pre-measures only in session 1 | 2–3 min |
| **Narrative** | Read episode narrative (800–1100 characters) | 5–7 min |
| **Anchoring** | 6 anchoring questions (during/right after reading) | 4–6 min |
| **Self-explanation** | 2 self-explanation prompts with open response | 4–5 min |
| **Mini-lesson** | One short mini-lesson (200–300 characters) | 2–3 min |
| **Confirmation quiz** | 4 quiz items with feedback | 5–7 min |
| **Wrap-up** | Post-measures only in session 4; closing message | 3–5 min |

**Current app flow** (as implemented): narrative → self-explanation (2 prompts) → mini-lesson → completion. Anchoring and quiz are defined in content/data; full flow can be extended in the UI. After episode 4, the app directs users to **background-knowledge** (prior knowledge test) and supports **survey**, **reading-comprehension**, and **scenario** routes for research measures.

### Data and Logging Schema

All session and item-level data are structured for research analysis (prior knowledge growth, disciplinary literacy).

**Session-level**

| Field | Type | Description |
|-------|------|-------------|
| `session_id` | string | Unique session ID |
| `user_id` | string | Participant (student) ID |
| `episode_id` | string | Episode number (1–4) |
| `started_at` | datetime (ISO) | Session start |
| `ended_at` | datetime (ISO) | Session end |

**Item/response-level**

| Field | Type | Description |
|-------|------|-------------|
| `item_id` | string | Item/prompt ID (anchoring, SE, quiz, etc.) |
| `item_type` | enum | `anchoring` \| `self_explanation` \| `mini_lesson_quiz` |
| `displayed_at` | datetime | When the item was shown |
| `response_raw` | string | Student’s raw input |
| `response_submitted_at` | datetime | Submit time |
| `score` | number | Score or rubric score |
| `rubric_codes` | string[] | Applied rubric/keyword codes |
| `feedback_shown` | string | Feedback text or ID shown |
| `time_on_item_sec` | number | Time on item (seconds) |
| `attempt_order` | number | Attempt order for the same item |

Logs are stored in **localStorage** under `reads_logs`; survey data under `reads_survey`. Backend integration can be added for central collection.

### Pre/Post Measures (Designed)

- **Knowledge test** (pre and post, same items): Ecology/climate prior knowledge (amount, accuracy); mix of multiple-choice, short-answer, brief constructed response; structured for researcher coding and/or automated scoring.  
- **Survey** (pre and post): Self-report on disciplinary literacy (evidence–claim, variable control, uncertainty, graphs/tables, source credibility); Likert-style items; structured for factor analysis.  
- **Comprehension** (e.g. post or by session): Integration and inference across the four episodes (e.g. identify claims and evidence, short inference); fixed rubrics for consistent coding.

### Application Structure (Codebase)

- **Routes**
  - `/` — Home; entry to episodes 1–4  
  - `/session/[episode]` — One episode session (narrative → self-explanation → mini-lesson → done)  
  - `/survey` — Pre/post survey  
  - `/background-knowledge` — Prior knowledge test  
  - `/reading-comprehension` — Comprehension task(s)  
  - `/scenario` — Scenario-based disciplinary literacy / problem-solving  

- **Data**
  - `src/data/episodes.ts` — Episode registry (1–4)  
  - `src/data/episode1.ts` … `episode4.ts` — Per-episode content: `meta`, `narrative`, `anchoring`, `selfExplanation`, `miniLesson`, `quiz`  
  - `src/data/backgroundKnowledge.ts`, `readingComprehension.ts` — Measure content  

- **Types** (`src/lib/types.ts`)
  - `SessionLog`, `ResponseLog` — Log schema  
  - `EpisodeContent`, `EpisodeMeta`, `AnchoringQuestion`, `SelfExplanationPrompt`, `QuizItem` — Episode and item types  

- **Session UI** (`src/app/session/[episode]/SessionFlow.tsx`): Controls step order (narrative → self-explanation → mini-lesson → done), records responses, and persists to `reads_logs`.

---

## Tech

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Vercel** recommended for deployment

## Local development

```bash
cd reads
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy (Vercel)

1. Push this project to a **GitHub** repository.
2. Log in at [Vercel](https://vercel.com), **New Project** → select the GitHub repo.
3. Set Root Directory to `reads` (or leave as root if the repo root is `reads`).
4. Deploy and check the provided URL.

## Project structure (summary)

- `src/app/` — Pages: home (`/`), session (`/session/[episode]`), survey (`/survey`), background-knowledge, reading-comprehension, scenario  
- `src/data/` — Episode content (episode 1 full; 2–4 may use placeholders), measure content  
- `src/lib/types.ts` — Log schema and episode/item types  

## Data and logs

- Session responses are accumulated in **localStorage** under `reads_logs` (backend integration possible for research collection).
- Pre/post survey responses are stored in `reads_survey`.

## Related docs

Use with project-root docs such as `0_개발에이전트_시스템프롬프트.md` and `1_설계_블루프린트.md`.
