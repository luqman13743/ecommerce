"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/actions/cart";

interface Variant {
  id: string;
  name: string;
  options: Record<string, string>;
}

interface Props {
  productId: string;
  variants: Variant[];
  inStock: boolean;
}

export function AddToCartForm({ productId, variants, inStock }: Props) {
  const [variantId, setVariantId] = useState(variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      try {
        await addToCart({ productId, variantId, quantity });
        setMessage("Added to cart.");
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Couldn't add to cart.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {variants.length > 0 && (
        <div>
          <label htmlFor="variant" className="block text-sm font-medium mb-1.5">
            Option
          </label>
          <select
            id="variant"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="w-full max-w-xs rounded border border-sand dark:border-white/10 bg-transparent px-3 py-2 text-sm"
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium mb-1.5">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={50}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 rounded border border-sand dark:border-white/10 bg-transparent px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={!inStock || pending}
        className="w-full sm:w-auto rounded-md bg-accent px-6 py-3 text-white text-sm font-medium hover:bg-accent-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Adding…" : inStock ? "Add to cart" : "Out of stock"}
      </button>

      {message && (
        <p role="status" className="text-sm text-ink/70 dark:text-white/70">
          {message}
        </p>
      )}
    </form>
  );
}
