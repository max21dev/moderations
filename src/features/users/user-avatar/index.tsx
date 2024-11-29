import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { loader } from '@/shared/utils';

import { useProfile } from 'nostr-hooks';

export function UserAvatar({ pubkey }: { pubkey: string }) {
  const { profile } = useProfile({ pubkey });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="flex justify-center items-center">
            {!profile || !profile.image ? (
              <AvatarFallback className="bg-purple-600/50">
                {pubkey.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            ) : (
              <AvatarImage src={loader(profile?.image, { w: 50, h: 50 })} alt={profile?.name} />
            )}
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{profile?.name ? profile?.name : pubkey}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
