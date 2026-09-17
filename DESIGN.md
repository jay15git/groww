# Groww IRL design system

## Direction

Operate-mode mobile financial app expressed as an Indian internet scrapbook with proof-receipt discipline. Discovery feels culturally alive; consequential money states become clean documents.

The world combines three familiar artifacts:
- Editorial social posts for discovery and AI truth checks.
- Future postcards for goals and scenario simulation.
- Itemized receipts and tracked parcels for decisions and money movement.

## Composition

- Mobile surface uses a strong top story followed by one obvious next action.
- Desktop view presents the phone-scale product inside a wider editorial launch canvas, never stretches the mobile UI into a dashboard.
- Asymmetric blocks, cropped labels, ruled receipt rows, large numerals, and occasional offset color fields create character.
- Core controls remain familiar and stable. Expression comes from content framing, typography, and transitions rather than unusual navigation.
- Five primary destinations: Today, Discover, GR-1, Squads, Portfolio.

## Color strategy

Full palette with named roles:
- Ink `#101915`: primary text and dark surfaces.
- Rice `#F6F1E7`: warm primary background.
- Groww green `#00B386`: action, progress, brand recognition.
- Acid `#C7F36B`: selected discovery and AI states.
- Cobalt `#4169E1`: evidence and information.
- Mango `#FFB547`: future scenarios and learning.
- Coral `#FF7657`: social energy, never errors or losses.
- Loss `#D94A4A`: negative financial status only.
- White `#FFFDF8`: elevated transactional surfaces.

Color never carries financial state alone. Icons and labels accompany gain, loss, pending, and risk states.

## Typography

- Display and campaign: Anek, variable width and weight. It supports Latin and nine Indian scripts and gives the system an Indian typographic voice without decorative cliché.
- Product body: system UI stack for speed and readability, with locale-specific Noto Sans fallback.
- Financial numbers use tabular figures.
- Headlines are short, wide, and decisive. Body copy stays plain.

## Components

- `StoryCard`: editorial discovery block with one dominant claim.
- `ProofStrip`: itemized evidence with supported, missing, and hype states.
- `FutureCard`: a scenario represented as a destination postcard.
- `Receipt`: clean review document containing amount, goal, risk, cost, exit, and source.
- `TrailStep`: tracked money status with owner, state, time, and recovery.
- `PersonaSwitch`: prototype-only control for Student, Salaried, and Freelancer states.
- `BottomNav`: five destinations with central GR-1 action.
- `ActionSheet`: consequence preview before state changes.

Avoid nested cards. Lists and ruled sections should replace extra containers.

## Imagery

- Use abstract editorial shapes and real-life object cues rather than stock-market photography.
- Goal imagery references hostel desks, salary messages, freelance invoices, metro tickets, gig receipts, and family gifts.
- No photographs presented as real users.
- No fake testimonials.
- Texture is subtle grain on discovery surfaces only. Transaction surfaces remain visually clean.

## Voice

- Discovery: sharp, warm, culturally aware.
- Learning: curious and plain.
- Planning: optimistic but specific.
- Transactions, risk, losses, consent, and errors: calm, exact, zero jokes.
- Hinglish appears intentionally in selected discovery copy, never through literal machine-translated slang.

## Motion

- Claim cards split into evidence strips.
- Future scenarios slide horizontally with number interpolation.
- Receipt rows reveal sequentially before confirmation.
- Money Trail advances vertically like tracked delivery.
- Navigation transitions use short opacity and transform changes.
- No bounce, confetti, flashing prices, or perpetual motion.
- Reduced-motion users receive immediate state changes without loss of information.

## Responsive and accessibility

- Primary target: 390 × 844 mobile viewport.
- Functional from 320px width.
- Desktop adds contextual side rail and demo controls while preserving mobile information hierarchy.
- Touch targets at least 44px.
- Visible keyboard focus.
- WCAG 2.2 AA contrast.
- Semantic buttons, tabs, progress, dialogs, and status announcements.
- Text remains usable at 200% zoom.

## Pinterest inspo synthesis (collected 2026-09-17)

Boards scanned: `investment app ui design`, `stock trading app ui design dark`, `gen z fintech app design`, `finance app onboarding screens ui`, `gen z graphic design aesthetic scrapbook collage`, `neobrutalism app ui design doodle stickers`.

### Patterns worth taking

- **Lime/acid green on ink or rice** is the dominant modern fintech signal (Zeyevi, Paynx, Wise-style). Matches Groww green → push toward acid green accent, not bank-blue.
- **Big tabular balance number** top of home, everything else secondary. Portfolio value is the hero; use tabular figures.
- **Dark mode = trading desk.** Dense green/red candle charts, compact rows. Reserve dark + neon for Portfolio/market surfaces, not discovery.
- **Rounded chunky cards, 20-28px radius**, soft shadows, pastel section tints (mint, lilac, butter) for goals/pots.
- **Onboarding = illustration-led single idea per screen**, progress dots, big rounded CTA. No feature carousels.
- **Gen Z art layer** (scrapbook/grunge collage): torn paper edges, sticker-bomb doodles, star bursts, hand-drawn arrows, receipt textures, halftone, Y2K sparkles, mixed-type ransom-note headlines. Use on Discover/education/empty states only.
- **Neobrutalist UI kits**: thick 2-3px ink borders, hard offset shadows (no blur), flat saturated fills, chunky pill buttons, sticker chips. Strong fit for Decision Receipt + Reality Check verdict cards — reads as "proof documents."
- **Sticker/doodle iconography**: wobbly-line icons, blob characters, hand-drawn checkmarks → friendly layer over serious finance core.

### Do-not-take

- Crypto-casino neon purple/blue gradients — reads speculative, off-brand for first-jobber trust.
- Pure maximalist collage on transaction screens — kills legibility, breaks the "serious when money moves" rule.
- Fake lifestyle photography of users — already banned in Imagery.

### Fusion rule

Core app = clean fintech (lime-on-ink, tabular numbers, rounded cards). Gen Z scrapbook/neobrutalist layer = borders, stickers, torn textures on discovery, learning, receipt, and celebration surfaces only.
