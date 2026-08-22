type CategoryPageProps = {
  params: Promise<{
    name: string;
  }>;
};

const categoryLabels: Record<string, string> = {
  all: "همه",
  saffron: "زعفران",
  barberry: "زرشک",
  jujube: "عناب",
  gifts: "پیشکش",
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params;

  const label = categoryLabels[name] ?? name;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <section className="rounded-sagart border border-gold/20 bg-luxury-surface p-10 shadow-luxury">
        <p className="text-sm text-gold">خزانه</p>

        <h1 className="mt-3 text-3xl text-charcoal">{label}</h1>

        <p className="mt-4 text-charcoal/70">
          این صفحه در فاز بعدی به API ساگارت متصل می‌شود و محصولات را به صورت
          SSR نمایش می‌دهد.
        </p>
      </section>
    </div>
  );
}