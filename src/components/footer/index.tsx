import { Hash, Youtube, Facebook } from "lucide-react";
import { Text } from "../../ui";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-secondary text-secondary-content">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <Hash className="h-10 w-10 text-secondary-content" aria-hidden />
            <Text size="lg" weight="semibold" className="text-secondary-content">
              Let's Function
            </Text>
            <Text size="sm" className="text-secondary-content/80">
              Providing reliable rentals since 2024
            </Text>
          </div>
          <div className="flex flex-col gap-3">
            <Text size="xs" weight="medium" className="uppercase tracking-wider text-secondary-content/70">
              Social
            </Text>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-content hover:text-secondary-content/80 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-content hover:text-secondary-content/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-content hover:text-secondary-content/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
