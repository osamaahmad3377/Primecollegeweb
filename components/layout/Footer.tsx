import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { socialIcons, type SocialName } from "@/components/ui/SocialIcons";
import { footerNav } from "@/data/navigation";
import { acknowledgement, site } from "@/data/site";

const year = 2026;

export function Footer({
  logoSrc,
  logoLightSrc,
}: {
  logoSrc: string | null;
  logoLightSrc?: string | null;
}) {
  const { regulatory } = site;
  const hasRegulatory =
    regulatory.rtoCode || regulatory.cricosCode || regulatory.abn;

  return (
    <footer
      data-print-hide
      className="relative isolate overflow-hidden bg-navy-dark text-white"
    >
      {/* Gold accent line closing the page. */}
      <div aria-hidden="true" className="relative z-10 h-0.5 w-full bg-gold" />

      {/* An oversized, ultra-faint outline of the college name — the scale
          and gravitas of a monumental inscription, done in type rather than
          by repeating the crest itself. Never legible enough to compete with
          real content; purely a sense of presence behind it. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[6vw] left-1/2 z-[-1] w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[clamp(5rem,22vw,16rem)] font-medium leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]"
      >
        PRIME
      </p>

      {/* Extra bottom padding on small screens so the fixed mobile action bar
          never covers the final footer lines. */}
      <Container className="relative z-10 py-16 pb-28 sm:py-20 sm:pb-28 lg:py-24 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Logo
              src={logoSrc}
              lightSrc={logoLightSrc}
              tone="light"
              className="h-16 lg:h-20 xl:h-24"
            />
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-navy-muted">
              {site.foundingStatement}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {site.social.map((channel) => {
                const Icon = socialIcons[channel.label as SocialName];
                const configured = !channel.href.startsWith("[");

                return (
                  <li key={channel.label}>
                    <a
                      href={configured ? channel.href : undefined}
                      aria-disabled={!configured}
                      target={configured ? "_blank" : undefined}
                      rel={configured ? "noopener noreferrer" : undefined}
                      title={
                        configured
                          ? undefined
                          : `${channel.label} — official account URL not yet supplied`
                      }
                      className={`inline-flex size-10 items-center justify-center rounded-sm border border-white/15 transition-colors duration-300 ${
                        configured
                          ? "text-white/80 hover:border-gold hover:text-gold-light"
                          : "cursor-not-allowed text-white/40"
                      }`}
                    >
                      <Icon className="size-[1.05rem]" />
                      <span className="sr-only">
                        {site.name} on {channel.label}
                        {configured ? " (opens in a new tab)" : " — link pending"}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-quick" className="lg:col-span-4">
            <h2 id="footer-quick" className="eyebrow text-gold-light">
              Quick Links
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {footerNav.quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-rule text-sm text-navy-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Information */}
          <nav aria-labelledby="footer-info" className="lg:col-span-2">
            <h2 id="footer-info" className="eyebrow text-gold-light">
              Information
            </h2>
            <ul className="mt-6 space-y-3">
              {footerNav.information.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-rule text-sm text-navy-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h2 className="eyebrow text-gold-light">Contact</h2>
            <address className="mt-6 space-y-4 text-sm not-italic leading-relaxed text-navy-muted">
              <p>
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="space-y-1 font-mono">
                <span className="block">{site.contact.phone}</span>
                <span className="block break-words">{site.contact.email}</span>
              </p>
            </address>
          </div>
        </div>

        {/* Acknowledgement of Country */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-[80ch] text-xs leading-relaxed text-white/60">
            {acknowledgement}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-white/60">
            © {year} {site.name}. All rights reserved.
          </p>

          {/* Registration codes read as credential data, not prose — mono
              gives them the stamped, verified quality that suits a legal line. */}
          {hasRegulatory ? (
            <p className="font-mono text-xs text-white/60">
              {[regulatory.rtoCode, regulatory.cricosCode, regulatory.abn]
                .filter(Boolean)
                .join(" · ")}
            </p>
          ) : (
            /* Regulatory identifiers are intentionally absent. They must only
               appear once the college supplies verified codes. */
            <p className="font-mono text-xs text-white/55">
              [INSERT OFFICIAL REGISTRATION DETAILS]
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
