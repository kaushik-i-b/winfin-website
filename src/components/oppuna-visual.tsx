/**
 * Oppuna's visual treatment: white and lavender, soft shapes, a breathing cue.
 * This is an illustrative composition, not a screenshot of the app.
 */
export function OppunaVisual() {
  return (
    <figure className="mx-auto w-full max-w-[400px]">
      <div className="rounded-[2rem] border border-line bg-surface p-2.5 shadow-[0_1px_2px_rgba(16,24,39,0.05),0_24px_48px_-24px_rgba(16,24,39,0.25)]">
        <div className="overflow-hidden rounded-[1.6rem] bg-lavender-soft/60 text-ink">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-4 text-xs">
            <span className="font-semibold text-lavender">Oppuna</span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2 py-0.5 font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-lavender" aria-hidden="true" />
              On-device
            </span>
          </div>

          {/* breathing */}
          <div className="flex flex-col items-center px-6 pb-6 pt-7">
            <div className="relative grid h-36 w-36 place-items-center" aria-hidden="true">
              <div className="absolute inset-0 rounded-full bg-lavender/10" />
              <div className="breathe absolute inset-3 rounded-full bg-lavender/20" />
              <div className="breathe absolute inset-9 rounded-full bg-surface" style={{ animationDelay: "0.3s" }} />
              <span className="relative text-base font-medium text-lavender">Breathe in</span>
            </div>
            <p className="mt-4 text-center text-sm text-muted">Box breathing · 4 · 4 · 4 · 4</p>
          </div>

          {/* conversation */}
          <div className="space-y-3 border-t border-line bg-surface px-5 py-5 text-[0.88rem] leading-snug">
            <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-canvas px-4 py-3">
              What felt heaviest about today?
            </p>
            <p className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-lavender px-4 py-3 text-on-lavender">
              Mostly the deadline. I couldn&apos;t switch off.
            </p>
            <div className="flex items-center gap-2 pt-1" aria-hidden="true">
              {["😔", "😐", "🙂", "😊"].map((e, i) => (
                <span
                  key={e}
                  className={`grid h-9 w-9 place-items-center rounded-full text-base ${
                    i === 1 ? "bg-lavender-soft ring-2 ring-lavender" : "bg-canvas"
                  }`}
                >
                  {e}
                </span>
              ))}
              <span className="ml-auto text-xs text-muted">Mood logged</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-subtle">
        Illustrative composition, not an app screenshot
      </figcaption>
    </figure>
  );
}
