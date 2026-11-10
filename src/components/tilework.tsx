/**
 * Восьмилучевая звезда — мотив узбекской майолики.
 * Единственный декоративный элемент на странице: используется в герое и подвале.
 */
export function Tilework({ id, className }: { id: string; className?: string }) {
  // id обязателен: на странице несколько копий, а id паттерна должен быть уникальным.
  const patternId = `girih-${id}`;

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <path
            d="M20 2 24.6 13.2 36 9.4 32.2 20.8 43.4 25.4 32.2 30 36 41.4 24.6 37.6 20 48.8 15.4 37.6 4 41.4 7.8 30 -3.4 25.4 7.8 20.8 4 9.4 15.4 13.2Z"
            transform="translate(0,-5) scale(0.92)"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.55"
          />
          <circle cx="20" cy="18" r="2" fill="currentColor" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function StarMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M16 0 20 9.3 29.6 5.9 26.2 15.5 35.5 19.5 26.2 23.5 29.6 33.1 20 29.7 16 39 12 29.7 2.4 33.1 5.8 23.5 -3.5 19.5 5.8 15.5 2.4 5.9 12 9.3Z"
        transform="translate(0,-3) scale(0.82) translate(3,3)"
        fill="currentColor"
      />
    </svg>
  );
}
