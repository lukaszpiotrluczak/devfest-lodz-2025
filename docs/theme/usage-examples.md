## Usage examples (short snippets)

### Tabs (active/inactive)

```html
<div role="tablist" class="flex gap-2 p-2">
  <button
    role="tab"
    aria-selected="true"
    class="rounded-xl px-3 py-2 bg-[var(--tab-active-bg)] text-[var(--btn-primary-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
  >
    <span aria-hidden="true" class="mr-2">👤</span><span>Me</span>
  </button>

  <button
    role="tab"
    aria-selected="false"
    class="rounded-xl px-3 py-2 bg-[var(--surface)] text-[var(--text)] border border-[var(--divider)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
  >
    <span aria-hidden="true" class="mr-2">🏢</span><span>Luczak Consulting</span>
  </button>
</div>
```

### Primary / secondary button

```html
<button
  class="rounded-xl px-4 py-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
>
  Primary
</button>

<button
  class="rounded-xl px-4 py-2 bg-transparent text-[var(--text)] border border-[var(--btn-secondary-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
>
  Secondary
</button>
```

### Glass card

```html
<article class="rounded-2xl p-4 glass-surface">
  <h3 class="font-[var(--font-accent)] text-lg">Card title</h3>
  <p class="mt-2 text-[var(--text-secondary)]">
    Card content…
  </p>
  <div class="mt-4 flex gap-2">
    <button class="rounded-xl px-3 py-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]">
      Action
    </button>
  </div>
</article>
```

### Form input (placeholder usage)

```html
<label class="block text-sm mb-2 text-[var(--text-secondary)]">Email</label>
<input
  type="email"
  class="w-full rounded-xl px-3 py-2 bg-[var(--surface)] text-[var(--text)] border border-[var(--divider)]
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
         focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
/>
```

### Avatar ring (personal-brand contexts only)

```html
<div class="inline-flex items-center justify-center rounded-full p-[2px] bg-[var(--brand-personal-primary)]">
  <img
    alt="Profile photo"
    class="h-16 w-16 rounded-full object-cover bg-[var(--surface)]"
    src="/avatar.jpg"
  />
</div>
```

