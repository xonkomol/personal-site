export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Данные формируются на сервере из конфига, пользовательского ввода здесь нет.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
