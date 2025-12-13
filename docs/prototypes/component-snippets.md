# Component snippets (HTML + Tailwind utilities)

> Notes:
>
> - Snippets use contract-driven CSS variables from `docs/theme/tailwind-theme.css`.
> - `glass-surface` is defined by the theme file.
> - Tabs must be wired with the keyboard + ARIA logic shown in `index.html`.

---

## Tabs (tablist + tab + tabpanel)

```html
<section class="glass-surface rounded-2xl p-2" aria-label="Primary navigation">
  <div
    role="tablist"
    aria-label="Profile sections"
    class="grid grid-cols-5 gap-2"
  >
    <button
      type="button"
      role="tab"
      id="tab-me"
      aria-controls="panel-me"
      aria-selected="true"
      tabindex="0"
      class="rounded-xl px-2 py-3 text-xs sm:text-sm font-medium tab-active"
    >
      <span class="mx-auto inline-flex items-center gap-2">
        <span aria-hidden="true"><!-- icon --></span>
        <span>Me</span>
      </span>
    </button>

    <button
      type="button"
      role="tab"
      id="tab-contact"
      aria-controls="panel-contact"
      aria-selected="false"
      tabindex="-1"
      class="rounded-xl px-2 py-3 text-xs sm:text-sm font-medium tab-inactive"
    >
      <span class="mx-auto inline-flex items-center gap-2">
        <span aria-hidden="true"><!-- icon --></span>
        <span>Contact</span>
      </span>
    </button>
  </div>
</section>

<article
  id="panel-me"
  role="tabpanel"
  aria-labelledby="tab-me"
  tabindex="0"
  class="glass-surface rounded-2xl p-4 sm:p-6"
>
  <!-- content -->
</article>
```

---

## Button — Primary

```html
<a
  class="btn-primary rounded-xl px-4 py-3 inline-flex items-center justify-center font-medium"
  href="#"
>
  Primary action
</a>
```

---

## Button — Secondary

```html
<a
  class="btn-secondary rounded-xl px-4 py-3 inline-flex items-center justify-center font-medium"
  href="#"
>
  Secondary action
</a>
```

---

## Glass Card

```html
<section class="glass-surface rounded-2xl p-4 sm:p-6">
  <h2 class="font-[var(--font-accent)] text-lg">Card title</h2>
  <p class="mt-2 text-sm text-secondary">Card content text.</p>
  <div class="mt-4">
    <a class="btn-secondary rounded-xl px-4 py-2 text-sm" href="#"
      >Card action</a
    >
  </div>
</section>
```

---

## Social Icon Link (icon + label)

```html
<a
  class="glass-surface rounded-xl p-3 inline-flex items-center gap-2"
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <span aria-hidden="true"><!-- inline SVG icon --></span>
  <span class="text-sm">Label</span>
</a>
```

---

## Contact Form Field — Text Input

```html
<div>
  <label class="block text-sm font-medium" for="email">Email</label>
  <input
    class="mt-2 w-full rounded-xl border divider bg-transparent px-4 py-3"
    id="email"
    name="email"
    type="email"
    autocomplete="email"
    required
  />
</div>
```

---

## Contact Form Field — Textarea

```html
<div>
  <label class="block text-sm font-medium" for="message">Message</label>
  <textarea
    class="mt-2 w-full rounded-xl border divider bg-transparent px-4 py-3"
    id="message"
    name="message"
    rows="5"
    required
  ></textarea>
</div>
```

---

## Event Item

```html
<li class="glass-surface rounded-2xl p-4">
  <p class="text-xs text-secondary">Speaker · 2025-12-13</p>
  <p class="mt-1 font-medium">DevFest Łódź 2025</p>
  <p class="mt-1 text-sm text-secondary">
    Politechnika Łódzka, Kampus A, Budynek A12, Sala E5
  </p>

  <p class="mt-3 text-sm"><span class="font-medium">Talk title…</span></p>
  <p class="mt-1 text-sm text-secondary">Short description…</p>

  <a
    class="mt-3 inline-flex btn-secondary rounded-xl px-4 py-2 text-sm"
    href="#"
    target="_blank"
    rel="noopener noreferrer"
  >
    Event link (TBD)
  </a>
</li>
```

---

## Publication Item

```html
<li id="pub-fi-2023-328" class="glass-surface rounded-2xl p-4">
  <p class="text-xs text-secondary">paper · 2023</p>
  <p class="mt-1 font-medium">
    Evaluating MPTCP Congestion Control Algorithms: Implications for Streaming
    in Open Internet
  </p>
  <p class="mt-1 text-sm text-secondary">Future Internet 2023, 15, 328</p>
  <a
    class="mt-3 inline-flex btn-secondary rounded-xl px-4 py-2 text-sm"
    href="https://doi.org/10.3390/fi15100328"
    target="_blank"
    rel="noopener noreferrer"
  >
    DOI
  </a>
</li>
```
