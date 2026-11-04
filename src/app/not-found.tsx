import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between">
      <Navbar sticky showBack />
      <div className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <span className="eyebrow !text-[#006241]">404 ERROR</span>
          <h1 className="font-serif text-7xl text-ink mt-2">404</h1>
          <h2 className="mt-4 text-2xl font-bold text-[#1e3932]">Page not found</h2>
          <p className="mt-2 text-sm text-[#4a6058]">
            The page you're looking for doesn't exist or has been moved to a new address.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/" className="btn-ink">
              Back to Home
            </Link>
            <Link href="/menu" className="btn-line">
              Explore Menu
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

