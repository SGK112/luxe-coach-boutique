'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Link2, Mail, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
}

export default function SocialShare({ url, title, description, image }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: '#1877F2',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#1DA1F2',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: '#25D366',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: '#EA4335',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
      setIsOpen(false);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>

      {/* Share Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border z-20 py-2">
            <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-medium">
              Share this product
            </p>

            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <link.icon
                  className="w-5 h-5"
                  style={{ color: link.color }}
                />
                <span className="text-sm">{link.name}</span>
              </a>
            ))}

            <div className="border-t my-2" />

            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
            >
              <Link2 className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Copy Link</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
