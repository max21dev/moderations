import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip.tsx';

import { ellipsis } from '@/shared/utils';

import { useUserInfoRow } from './hooks';
import { NDKUser } from '@nostr-dev-kit/ndk';

export function UserInfoRow({ pubkey }: { pubkey: string }) {
  const { profile } = useUserInfoRow({ pubkey });

  return (
    <div className="flex items-center gap-4 p-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="flex justify-center items-center">
              {!profile || !profile?.image ? (
                <AvatarFallback>{pubkey.slice(0, 2).toUpperCase()}</AvatarFallback>
              ) : (
                <AvatarImage src={profile?.image} alt={profile?.name} />
              )}
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{profile?.name ? profile?.name : pubkey}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex flex-col">
        <span className="text-sm">{profile?.displayName}</span>
        {/* <span className="text-sm">{profile?.bio}</span> */}
        <span className="text-sm text-gray-500">{ellipsis(new NDKUser({ pubkey }).npub, 10)}</span>
      </div>
    </div>
  );
}
