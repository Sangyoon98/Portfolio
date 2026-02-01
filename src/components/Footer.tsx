import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-8 text-center">
        <p className="text-xs text-black/50 dark:text-white/50">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

