import Link from "next/link";
import { Suspense } from "react";
import { getFeaturedProducts } from "@/services/products";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { publicUrlFor } from "@/lib/r2/upload";

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-sand dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] max-w-[18ch]">
            Goods worth keeping, priced honestly.
          </h1>
          <p className="mt-4 max-w-prose text-ink/70 dark:text-white/70">
            A curated catalog, checked stock, and delivery across Pakistan — pay by card,
            JazzCash or EasyPaisa.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-white text-sm font-medium hover:bg-accent-dim transition-colors"
          >
            Browse the shop
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl">New arrivals</h2>
          <Link href="/shop" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <Suspense fallback={<FeaturedGridSkeleton />}>
          <FeaturedGrid />
        </Suspense>
      </section>
    </div>
  );
}

async function FeaturedGrid() {
  const products = await getFeaturedProducts(8);

  if (products.length === 0) {
    return (
      <p className="text-sm text-ink/60 dark:text-white/60">
        No products yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          slug={product.slug}
          name={product.name}
          price={product.price}
          salePrice={product.salePrice}
          imageUrl={product.images[0] ? publicUrlFor(product.images[0].objectKey) : undefined}
          imageAlt={product.images[0]?.altText ?? undefined}
        />
      ))}
    </div>
  );
}

function FeaturedGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
