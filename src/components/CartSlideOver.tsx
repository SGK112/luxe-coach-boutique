'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CartSlideOver() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } =
    useStore();

  const total = getCartTotal();
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);

  // Prevent body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-14 px-4 border-b">
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium">
              Bag ({cart.length})
            </span>
            <button
              onClick={() => setIsCartOpen(false)}
              className="flex items-center justify-center w-11 h-11 -mr-2"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {cart.length > 0 && remainingForFreeShipping > 0 && (
            <div className="px-4 py-3 bg-[#f8f7f5] border-b">
              <p className="text-[11px] text-center mb-2">
                Add <span className="font-medium">${remainingForFreeShipping.toFixed(0)}</span> more for free shipping
              </p>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-4 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" strokeWidth={1} />
                <p className="text-sm text-gray-500 mb-6">Your bag is empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="h-11 px-8 bg-black text-white text-xs tracking-[0.1em] uppercase font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}`}
                    className="flex gap-3"
                  >
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative w-20 h-24 flex-shrink-0 bg-[#f8f7f5]"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-[13px] font-medium line-clamp-2 hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.selectedColor.name}
                      </p>
                      <p className="text-[13px] font-medium mt-1">
                        ${item.product.price.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center h-8 border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[13px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[11px] text-gray-500 underline hover:text-black"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-3 safe-bottom">
              <div className="flex justify-between text-[13px]">
                <span>Subtotal</span>
                <span className="font-medium">${total.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-gray-500 text-center">
                Shipping calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex items-center justify-center h-12 w-full bg-black text-white text-xs tracking-[0.1em] uppercase font-medium hover:bg-gray-900 transition-colors"
              >
                Checkout
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex items-center justify-center h-11 w-full border border-black text-xs tracking-[0.1em] uppercase font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
