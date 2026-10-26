<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Sample/demo data lives in `src/data/` (types in `types.ts`), never inline in route components — keeps content easy to replace.
- Reusable game UI lives in `src/components/game/`; colours only via tokens in `src/styles.css` — keeps theming in one place.
- Tests list persists in localStorage via `src/lib/tests-store.ts` (no backend in prototype) — scope excludes backend.
