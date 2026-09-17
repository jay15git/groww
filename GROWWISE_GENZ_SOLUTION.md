# GrowWise for Gen Z: product solution

## 0. The decision (read first)

Build **GrowWise**: a version of GrowWise organized around a young Indian's real financial life — income rhythm, goals, internet influence, friends, fear — instead of around product categories.

One demonstrable spine:

> **See a claim → check the evidence → explore futures → create an adaptive plan → understand the action → track the money.**

Hypothesis: the barrier for Gen Z is not access — GrowWise already solved account opening. It is the gap between internet-driven curiosity and confident repeat investing. Closing that gap converts first-time account openers into long-horizon investors, GrowWise's highest-LTV cohort.

Reversal condition: if usability testing shows users will not bring external content into a broker app, Reality Check becomes a tool inside Wise rather than the entry point. The adaptive-plan and transparency spine still stands.

---

## 1. Brief contract

| Field | Answer |
|---|---|
| Objective | Design GrowWise for Indian Gen Z investors (20–26); prove product judgment through artifacts, not only polish |
| Decision to make | Which single product direction best serves this cohort and is demonstrable in ~12 hours |
| Constraints | No real transactions; working accessible link; prompts + evals submitted; 300–700-word page written by the candidate (not AI) |
| Deliverable | Interactive prototype + this strategy doc + prompt/eval packet |
| Time boundary | ~12 hours to app link |
| Open question that could change direction | Does the evaluator reward ambition or shipping realism? Assumed: both — ambition in the concept, honesty in the assumptions |

This is a concept prototype, not a production launch. It should be ambitious, interactive, and memorable while stating assumptions explicitly.

---

## 2. Problem framing

GrowWise has already made opening an account and buying an investment simple. The remaining problem is that a first-time investor still has to answer five difficult questions:

1. How much can I invest without affecting daily life?
2. What should I explore when I do not understand financial products?
3. Can I trust the advice I see on Instagram, YouTube, X, or WhatsApp?
4. What happens to my money after I confirm an investment?
5. What should I do when my first investment loses value?

The problem is therefore not access alone. It is the gap between curiosity and confident, repeat investing.

### Research signals

- Complexity and information gaps affect 74% of non-investors.
- Risk and return concerns affect 73%.
- Trust and transparency concerns affect 51%.
- Gen Z represents 56% of people intending to enter securities markets.
- 79% of Gen Z households prefer capital preservation.
- 81% of Gen Z prefers video-based financial education.
- Hindi and regional languages dominate education preferences.
- 93% of surveyed investors find finfluencers moderately or highly credible.
- 62% make at least some decisions using finfluencer recommendations.
- GrowWise already has millions of first-time investors and students, so this is a retention and lifetime-value opportunity, not a niche experiment.

Primary sources: SEBI Investor Survey 2025, SEBI FY2025–26 derivatives study, GrowWise Annual Report FY2025–26.

### Evidence integrity

- **Prompt facts:** age band 20–26; first paychecks; part-time work; students; GrowWise wants to serve this group best.
- **Public evidence:** every statistic above comes from the cited SEBI/GrowWise publications.
- **Assumptions:** Gen Z will share external content into a broker app; adaptive plans beat rigid SIPs for irregular earners; transparency after investment reduces early churn. Each assumption is marked where it shapes a feature, and the Defense Surface (section 15) states what evidence would reverse each one.
- **Not claimed:** desk research is not presented as customer interviews. Reddit/X signals were treated as directional anecdotes, not prevalence data.

---

## 3. User segmentation

Age does not determine the correct experience. Financial context does.

| Segment | Money situation | Main problem | Product response |
|---|---|---|---|
| Dependent student | Pocket money, gifts, no regular surplus | Investing feels inaccessible | Learning, simulations, manual small contributions |
| Earning student/intern | ₹5,000–₹20,000 irregular income | Cannot commit to rigid SIP | Flexible contribution after stipend/gig |
| Salaried, living with family | Regular income, low fixed costs | Does not know how much to invest | Payday allocation and goal plan |
| Salaried, living independently | Rent, bills, debt, family obligations | Risk of over-investing | Protected balance and emergency-first planning |
| Freelancer/creator/gig worker | Volatile monthly income | Fixed-date SIP can fail | Percentage-based capped investing |
| Curious beginner | High social-media exposure | Cannot judge online claims | AI Reality Check |
| Confident explorer | Wants stocks and advanced tools | Beginner flow feels restrictive | Direct search and advanced mode |
| Dormant/lapsed investor | Stopped after loss or cash emergency | Lost confidence | First Red Day and plan recovery |

The prototype should demonstrate three switchable contexts: Student, Salaried, and Freelancer.

---

## 4. Product thesis

# GrowWise

**Your money. Your next move.**

GrowWise reorganizes GrowWise around the real life of a young investor: income, goals, internet influence, friends, uncertainty, and future choices.

Current GrowWise begins with products such as stocks, mutual funds, IPOs, and F&O. GrowWise begins with the user’s situation and progressively connects it to the right product experience.

### Core journey

**See a claim → check the evidence → explore possible futures → create an adaptive plan → understand the investment → track the money**

This journey is the prototype’s main story. Other features support it but must not distract from it.

---

## 4.1 Rejected alternatives (decision ledger)

| Alternative | Why it lost | Cost of choosing the spine instead | What would reverse this |
|---|---|---|---|
| Gamified trading app — streaks, leaderboards, rewards (StockPe-style) | Rewards engagement volume, not judgment. SEBI data shows high-frequency engagement already correlates with losses for young, small-portfolio traders. GrowWise cannot be seen to gamify trading | Less "addictive" surface; relies on simulation/identity for retention | If the rubric rewarded pure daily-engagement mechanics |
| Education-first content layer (Varsity-style courses inside GrowWise) | Content ≠ action. Low differentiation — GrowWise and competitors already publish content. Does not touch the moment a user acts on a Reel | Reality Check still needs quality source material | If research showed ignorance, not misplaced trust, was the top blocker |
| Social copy-trading / pooled investing | Regulatory exposure, pooled-trust failure modes, worst outcome for beginners | Squads reduced to learning + goals only; loses virality of "follow my trades" | If SEBI published a clear copy-trading framework |
| Budgeting/expense app first | Off GrowWise's monetization; competes with Jupiter/Fi, not with brokers. GrowWise wins on investing, not daily money management | Income Autopilot stays shallower than a real budgeting tool | If GrowWise's strategy pivoted to a daily-finance super-app |
| Cosmetic Gen Z rebrand only | Shows design taste and zero product judgment — exactly what a take-home rubric penalizes | Chosen path risks "trying to do too much" | If the rubric weighted visual craft over product reasoning |

**Strongest rejected option:** gamified engagement. It is the most obvious "Gen Z" answer and the one most candidates will submit — which is why the rejection reasoning is worth saying out loud in the interview.

### Why this fits GrowWise specifically (not a generic fintech)

- **GrowWise already owns top of funnel.** Its problem is not installs — it is the leaky bucket between first investment and confident repeat investing. This concept attacks that exact gap.
- **Wise already exists.** Reality Check extends Wise to where influence actually happens — outside the app — instead of duplicating it.
- **GrowWise's economics reward 30-year relationships.** A 22-year-old's lifetime AUM compounds; retention of this cohort is worth more than any single feature conversion.
- **GrowWise's base is Tier-2/3, students, first jobs.** Irregular income is the norm in that base, which is precisely what Income Autopilot serves — Zerodha's audience is not this user.
- **Zerodha owns "serious trader" trust; INDmoney owns aggregation.** "First investor's financial OS" is unclaimed identity space, and Wrapped/Squads give GrowWise organic acquisition competitors cannot copy without the same user base.

---

## 5. Core solution

## 5.1 Wise Reality Check

The user shares an Instagram Reel, YouTube Short, WhatsApp message, screenshot, voice note, or X post with Wise.

Wise separates the content into:

- What is supported by evidence
- What is missing
- What is unverifiable
- What is promotional or manipulative
- What risks were not mentioned
- Which sources the user can inspect

Example:

> Claim: “Government-backed stock means zero risk and guaranteed returns.”

Wise responds:

- Government ownership: supported
- Zero risk: false
- Guaranteed return: unsupported
- Missing context: valuation, debt, earnings, volatility, time horizon
- Next step: inspect company and run scenario analysis

Wise does not stop at a verdict. It rewrites the claim as an honest 30-second explanation and teaches the manipulation pattern.

### Why it matters

Young investors already discover finance outside GrowWise. This feature lets GrowWise own the moment between seeing a claim and acting on it.

### Inspiration improved

- Public Alpha and Robinhood Cortex: AI research
- Fact-checking products: claim extraction
- GrowWise Wise: portfolio context

Improvement: multimodal social-content verification connected directly to planning and simulation.

---

## 5.2 Money Multiverse

The user explores alternate financial futures:

- Continue current behavior
- Invest ₹500 more
- Move to another city
- Buy a laptop
- Take a career break
- Lose one month of income
- Receive a salary increase
- Experience a 20% market fall

Each future displays ranges for:

- Emergency runway
- Goal date
- Monthly contribution
- Portfolio range
- Tradeoffs
- Action required now

Example:

> Moving to Bengaluru in July 2027
>
> Current path: 2.1 months of runway
>
> Investing 8% of freelance income: 3.4 months of runway
>
> Stressed case: goal delayed by four months

No guaranteed future value is shown. Base, optimistic, and stressed scenarios expose uncertainty.

### Why it matters

Traditional calculators ask users to imagine a corpus. Money Multiverse connects investment choices to life decisions that matter at age 20–26.

---

## 5.3 Income Autopilot

The investment plan adapts to how money arrives.

### Salary mode

- Trigger after payday
- Protect rent, bills, debt payments, and selected buffer
- Fixed contribution
- Optional step-up after salary increase

### Freelancer/gig mode

- User-selected percentage after eligible income
- Monthly maximum
- Skip low-income months
- Confirm unusual deposits

### Student mode

- Manual contribution
- Internship or stipend trigger
- No rigid monthly commitment
- Product remains useful through learning and simulation

### Mixed-income mode

- Fixed base from salary
- Optional percentage from bonuses or gigs

### Why it matters

A fixed monthly SIP assumes fixed monthly income. Gen Z employment increasingly includes internships, freelancing, creator income, side projects, and gig work.

---

## 5.4 Decision Receipt

Before confirming a simulated investment, the user receives a clean receipt:

- Amount
- Frequency
- Goal
- Time horizon
- Protected balance
- Product/category
- Why it may fit
- Why it may not fit
- Possible downside
- Fees in rupees and percentage
- Exit process
- Data and recommendation source

The user can ask Wise to explain any row.

### Why it matters

Most apps optimize speed to transaction. Decision Receipt demonstrates informed consent and explainability without making the experience boring.

---

## 5.5 Money Trail

After confirmation, the user sees exactly where the money is:

1. Bank debit initiated
2. Bank confirmed
3. Exchange/payment system received funds
4. Fund house or order system accepted
5. NAV/order price determined
6. Units allocated
7. Portfolio updated

Every stage answers:

- Where is my money?
- Is it safe?
- Who currently controls the next step?
- When should this finish?
- What can I do if it does not?

### Why it matters

Public reviews repeatedly mention anxiety around pending orders, withdrawals, NAV allocation, failed mandates, and generic support responses. This feature demonstrates operational and technical PM thinking.

---

## 5.6 First Red Day

When a first investment falls materially, the app changes state:

- Show goal context before daily P&L
- Explain what changed
- Compare movement with the original risk scenario
- Show whether the goal plan changed
- Offer pause/edit contribution
- Run a historical recovery simulation
- Ask Wise
- Reveal complete market data on demand

It never tells the user to “buy the dip” or guarantees recovery.

### Why it matters

Onboarding should continue after account creation. The first loss is often the most important onboarding moment.

---

## 6. Supporting wow features

These features appear in the prototype as believable secondary surfaces.

## 6.1 Promptfolio

User describes an investment idea in natural language:

> “Indian consumer growth, avoid tobacco and gambling, medium risk, ₹1,000 monthly.”

Wise creates a mocked basket with:

- Interpretation
- Holdings/products
- Weighting logic
- Risk
- Historical stress test
- Exclusions
- Fees
- What could invalidate the thesis

Production version would require registered research/advisory controls.

## 6.2 GrowWise Squads

Private groups for:

- Shared goals with individual ownership
- Learning challenges
- Hypothetical portfolio discussions
- Family plan review
- Verified creator rooms

No pooled money or automatic copy trading is included in the prototype.

## 6.3 Portfolio DNA

The app describes behavior rather than ranking returns:

- Curious Builder
- Calm Investor
- Theme Hunter
- Autopilot Investor
- Research Nerd
- FOMO Fighter

Dimensions include patience, diversification, research depth, automation, and goal alignment.

## 6.4 GrowWise Wrapped

Shareable milestones:

- First investment
- Questions asked before decisions
- Consistency during red months
- Hype claims avoided
- Goal progress
- Learning language

Amounts, holdings, salary, and returns are hidden by default.

## 6.5 GrowWise Campus

Vision feature containing college finance clubs, delayed-data simulations, regional-language workshops, learning competitions, and campus ambassadors.

---

## 7. App information architecture

## Today

- Financial snapshot
- Current goal
- Income Autopilot
- Money Multiverse
- Next recommended action
- First Red Day state

## Discover

- Personalized content
- Reality Check entry
- Promptfolios
- Verified creators
- Product discovery
- Direct search

## Wise

- Plan
- Explain
- Check
- Simulate
- Build
- Reflect
- Draft action

## Squads

- Friends
- Family
- Campus
- Creator rooms
- Shared goals

## Portfolio

- Holdings
- Goals
- Portfolio DNA
- Calm/full view
- Money Trail
- Wrapped

---

## 8. Brand and design direction

### Brand idea

**Indian internet culture meets a financial operating system.**

The app should feel bolder than current GrowWise without becoming a meme template.

### Visual system

- GrowWise green for recognition
- Deep ink and warm off-white as foundation
- Acid lime for AI/discovery
- Cobalt for evidence
- Mango for future scenarios
- Coral for social features
- Red only for loss/error
- Anek typography for a multi-script Indian identity
- Goal postcards
- Receipt layouts
- Social-content frames
- Editorial photography and abstract illustration
- Subtle texture on discovery screens
- Clean surfaces for financial actions

### Tone rules

| Context | Tone |
|---|---|
| Discovery | Clever, energetic, culturally aware |
| Learning | Friendly and plain |
| Goals | Optimistic |
| Investment | Calm and exact |
| Loss | Serious and non-judgmental |
| Errors | Direct and recovery-focused |
| Consent | Neutral and explicit |

Example discovery copy:

> “Guaranteed returns” detected. Markets have left the group chat.

Example transaction copy:

> Your payment failed. No money was debited. Retry or choose another account.

Humor never replaces clarity.

---

## 9. Prototype scope for the submission

### Main demo flow

1. Choose Student, Salaried, or Freelancer
2. Land on adaptive Today screen
3. Share viral content with Reality Check
4. Review evidence and missing context
5. Open Money Multiverse
6. Choose a future
7. Configure Income Autopilot
8. Review Decision Receipt
9. Confirm simulated investment
10. Follow Money Trail
11. View First Red Day response

### Secondary surfaces

- Promptfolio
- Squad
- Portfolio DNA
- GrowWise Wrapped

### Prototype assumptions

- All financial, market, transaction, cohort, and AI data is mocked.
- No real KYC, bank connection, recommendation, order, or money movement occurs.
- AI responses are deterministic for demo reliability.
- English and Hinglish are demonstrated.
- Promptfolio assumes a compliant research/advisory layer in production.
- Social goals maintain individual ownership.
- Projections show ranges and assumptions.
- User actions always require confirmation.

---

## 10. In scope

- Adaptive Gen Z onboarding
- Three income contexts
- AI social-content verification
- Future scenario simulator
- Flexible contribution planning
- Decision Receipt
- Money Trail
- First Red Day
- Promptfolio preview
- Squads preview
- Portfolio DNA
- Wrapped preview
- Complete visual redesign
- Mocked interactive data
- Responsive no-login web prototype

---

## 11. Out of scope

Out of scope means not built in the 12-hour prototype, not rejected as a product idea.

- Real KYC
- Real bank or Account Aggregator connection
- Live market data
- Real investment recommendations
- Real order execution
- Real UPI AutoPay mandate
- Complete social network/backend
- Creator verification operations
- Production moderation
- Every Indian language
- Production security certification
- Full regulatory approval
- Real performance or return claims

---

## 12. Success metrics

### Falsifiable hypothesis

> We believe an adaptive plan + explained decision + transparent settlement will raise 90-day retained investing among new Gen Z users, because the drop-off mechanism is anxiety and mistrust after the first transaction — not lack of access.

**We would abandon this direction if** Reality Check completion were high but plan creation did not move — that would mean users treat it as entertainment, not a decision tool.

### North star

**90-day Planned Investor Rate:** percentage of new users who create a plan, complete their first investment, complete at least two planned contributions, and remain invested after 90 days.

Leading indicators (because the north star lags): plan-creation rate, Decision Receipt expand rate, second-contribution rate, First Red Day session recovery rate.

### Funnel metrics

- Onboarding completion
- Reality Check completion
- Reality Check to deeper research
- Multiverse to plan creation
- Plan to first investment
- First to second contribution
- Autopilot setup success
- Decision Receipt comprehension
- Money Trail self-resolution

### Business metrics

- 90-day retention
- 12-month assets per user
- Appropriate multi-product adoption
- Support cost per funded user
- Organic referrals

### Guardrails

- Early panic redemption
- Failed mandates
- Users exceeding declared comfort amount
- AI advice violations
- Unsourced factual claims
- F&O adoption by inexperienced users
- Support complaints
- Consent withdrawal failures

---

## 12.1 Rollout if this were real

Sequencing shows judgment, so the concept orders production by risk-adjusted trust value:

| Phase | Ships | Why first/last |
|---|---|---|
| 1 | Income Autopilot + Money Trail | Lowest regulatory risk, immediate trust payoff, pure UX/engineering work |
| 2 | Decision Receipt + First Red Day | Content and design work; no new advice surface |
| 3 | Wise Reality Check + Money Multiverse | Needs model-risk review, citation pipeline, SEBI-aware output guardrails |
| 4 | Squads, Promptfolio, Campus, Wrapped | Needs advisory/research licensing, verification ops, and social moderation |

This order also de-risks the demo criticism: the two "wow" AI features arrive only after the trust infrastructure exists.

---

## 13. Evaluation plan

## Product-rule evals

Test synthetic users across income rhythm, surplus, debt, emergency buffer, goal, time horizon, risk tolerance, and language.

Required invariants:

- Protected money is never included in investable amount.
- Contribution never exceeds user cap.
- Irregular-income user is not forced into fixed plan.
- Every automation can be paused and revoked.
- Projection never appears guaranteed.
- Short-term need is not framed as suitable for high volatility.

## AI evals

Test:

- Guaranteed returns
- Fake security
- Outdated data
- Cherry-picked returns
- Screenshot without source
- Genuine educational content
- Opinion without factual claim
- Hinglish input
- Prompt injection inside shared content
- Direct request for a stock pick
- Loan-to-trade request
- Deepfake creator content

Release requirements:

- No direct buy/sell instruction
- No guaranteed returns
- Citation for factual verdicts
- Claim-by-claim output
- Clear uncertainty
- Consistent meaning across languages

## Usability evals

Participants:

- Students
- Salaried users living with parents
- Salaried users paying rent/debt
- Freelancers/gig workers
- Women
- Regional-language users
- Tier-2/3 users

Tasks:

- Check a social claim
- Compare futures
- Create plan
- Explain risk and cost
- Track pending investment
- Pause contribution
- Find direct stock search
- Remove data consent

Observe behavior. Do not ask only whether they like the design.

---

## 14. Defense surface (hardest questions, answered)

These are the questions a skeptical panel or the AI interview is most likely to ask, answered without reopening the document.

**"Isn't this just Wise with extra steps?"**
No. Wise answers questions inside the app. Reality Check captures the influence that happens outside the app — Reels, forwards, screenshots — and turns it into an evidence exercise that ends in a plan, not a trade. That is a new surface, not a reskin.

**"Why would anyone paste a reel into a broker app?"**
They already forward these clips to WhatsApp group chats asking "is this real?" The behavior exists; GrowWise just is not the destination. OS share-sheet integration makes the action one tap. Assumption is stated and testable — this is the stated reversal condition.

**"Your north star is a lagging, unfalsifiable metric."**
Correct that it lags — that is why leading indicators are defined (plan creation, receipt comprehension, second contribution, red-day recovery). Falsification condition is stated in section 12.

**"Money Multiverse numbers are made up. Isn't that misleading?"**
For the prototype, yes, they are mocked — stated in assumptions. The product design shows ranges plus assumptions rather than a single projected corpus, which is more honest than most live SIP calculators.

**"SEBI would never allow Promptfolio."**
Agreed as stated — it is a vision surface, clearly mocked, and production requires a registered advisory/research layer. The core spine does not depend on it; that is why it is phase 4, not phase 1.

**"Did you design for urban English-speaking users and call it Gen Z?"**
Segmentation is by income rhythm and financial context, not age or city. Three switchable contexts (student, salaried, freelancer), Hinglish support, and language-invariance evals exist specifically to counter that failure.

**"What did you cut and why?"**
Gamified engagement mechanics — see decision ledger, section 4.1. It is the most obvious Gen Z answer and the most harmful one given SEBI's own data on young high-frequency traders.

**"Where does GrowWise make money here?"**
Retention → AUM compounding → Prime/W/cross-sell later. Wrapped and Squads reduce CAC through organic sharing. Nothing in the spine monetizes trades, which is a feature, not a gap.

**"What is the single biggest risk?"**
A wrong Reality Check verdict destroys trust faster than a good one builds it. Mitigations: claim-by-claim output, mandatory citations, explicit uncertainty, no buy/sell instruction, and human-review escalation for high-reach claims.

**"If you shipped this tomorrow, what would you change?"**
Real market data, a compliance review of Reality Check outputs, consented Account Aggregator income detection, native share-sheet, full vernacular QA, and advisory sign-off before Promptfolio — in that order.

**"Isn't this too many features for 12 hours?"**
The demo has one spine of five capabilities; everything else is a preview card. Scope discipline is demonstrated by what is deliberately shallow, not by how much is listed.

**"Why is the strongest PM decision here?"**
Connecting discovery, decision, and post-investment trust into one journey instead of shipping isolated Gen Z features. Every capability exists to move a user one step along that spine.

---

## 14.1 Submission artifact mapping

| Required artifact | Where it lives | Status |
|---|---|---|
| 300–700-word page (not AI-written) | Candidate rewrites from sections 0, 2, 4, 5, 9–11 — outline provided separately | Pending candidate rewrite |
| Prompts used to create the tool | Prompt packet (separate file) | Pending after build |
| Evals used to test the solution | Eval packet from section 13, run against the build | Pending after build |
| Working app link | Vercel preview deployment | Pending build |

---

## 15. Final recommendation

Build GrowWise as an ambitious interactive concept centered on five capabilities:

1. Wise Reality Check
2. Money Multiverse
3. Income Autopilot
4. Decision Receipt
5. Money Trail

Use First Red Day to complete the investor lifecycle. Use Promptfolio, Squads, Portfolio DNA, and Wrapped to show the larger product vision.

The product should leave the reviewer with one clear idea:

> GrowWise does not make GrowWise younger by adding slang. It redesigns GrowWise around how young Indians actually earn, learn, decide, worry, and invest.
