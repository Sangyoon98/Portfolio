import { profile } from "@/data/portfolio";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-white dark:bg-white/[0.02] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="contact-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Contact
        </h2>

        <p className="text-sm text-black/60 dark:text-white/60 mb-6">
          새로운 기회와 협업에 항상 열려있습니다. 언제든 연락 주세요!
        </p>

        <div className="space-y-3">
          {profile.contact.email && (
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm text-black/50 dark:text-white/50">Email</span>
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {profile.contact.email}
              </a>
            </div>
          )}
          {profile.contact.phone && (
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm text-black/50 dark:text-white/50">Phone</span>
              <a
                href={`tel:${profile.contact.phone}`}
                className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {profile.contact.phone}
              </a>
            </div>
          )}
          {profile.contact.github && (
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm text-black/50 dark:text-white/50">GitHub</span>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {profile.contact.github.replace("https://", "")}
              </a>
            </div>
          )}
          {profile.contact.linkedin && (
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm text-black/50 dark:text-white/50">LinkedIn</span>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {profile.contact.linkedin.replace("https://", "")}
              </a>
            </div>
          )}
          {profile.contact.blog && (
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm text-black/50 dark:text-white/50">Blog</span>
              <a
                href={profile.contact.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {profile.contact.blog.replace("https://", "")}
              </a>
            </div>
          )}
          {profile.contact.notion && (
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm text-black/50 dark:text-white/50">Notion</span>
              <a
                href={profile.contact.notion}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Portfolio (Notion)
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

