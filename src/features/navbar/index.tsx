import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/components/ui/button';
import { H3 } from '@/shared/components/ui/typography/h3';

export const Navbar = () => {
  return (
    <>
      <div className="bg-secondary w-full h-14">
        <div className="mx-auto h-full w-full max-w-screen-xl flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <img src={'/moderations.svg'} alt="nip-29 moderations logo" className="h-8" />
            <H3>Moderations</H3>
          </div>

          <Button variant="ghost" className="gap-2" asChild>
            <a
              href="https://github.com/max21dev/moderations"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon />
              <span>GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};
