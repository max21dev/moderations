import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useActiveUser } from 'nostr-hooks';

import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { H3 } from '@/shared/components/ui/typography/h3';

import { ModeToggle } from '@/shared/components/mode-toggle';

import { UserAvatar } from '@/features/users';

export const Navbar = () => {
  const { activeUser } = useActiveUser();

  return (
    <>
      <div className="bg-secondary w-full h-14 fixed top-0 z-10">
        <div className="mx-auto h-full w-full max-w-screen-xl flex items-center justify-between px-4">
          <div className="flex items-center gap-4 overflow-hidden">
            <img src={'/moderations.svg'} alt="nip-29 moderations logo" className="h-8" />
            <H3>Moderations</H3>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/max21dev/moderations"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubLogoIcon className="h-5 w-5" />
              </a>
            </Button>

            {activeUser && (
              <Popover>
                <PopoverTrigger>
                  <UserAvatar pubkey={activeUser.pubkey} />
                </PopoverTrigger>

                <PopoverContent align="end" className="max-w-48">
                  <Button variant="ghost" className="w-full" asChild>
                    <a href="/logout">Logout</a>
                  </Button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
