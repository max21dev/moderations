import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useActiveUser } from 'nostr-hooks';

import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { H3 } from '@/shared/components/ui/typography/h3';

import { useGlobalNdk } from '@/shared/hooks';

import { UserAvatar } from '@/features/users';

export const Navbar = () => {
  const { globalNdk } = useGlobalNdk();

  const { activeUser } = useActiveUser({ customNdk: globalNdk });

  return (
    <>
      <div className="bg-secondary w-full h-14">
        <div className="mx-auto h-full w-full max-w-screen-xl flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <img src={'/moderations.svg'} alt="nip-29 moderations logo" className="h-8" />
            <H3>Moderations</H3>
          </div>

          <div className="flex items-center gap-4">
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
