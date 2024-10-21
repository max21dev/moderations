import { ArrowRightIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { H3 } from '@/shared/components/ui/typography/h3';
import { Muted } from '@/shared/components/ui/typography/muted';

import { UserInfoRow } from '@/features/users';

import { loader } from '@/shared/utils';

import { useGroupDetails } from './hooks';

export const GroupDetails = () => {
  const { groupId } = useParams();

  const { admins, group, members } = useGroupDetails({ groupId });

  if (!groupId) return null;

  return (
    <>
      <div className="mb-4 w-full flex items-center">
        <div className="flex items-center gap-2">
          <div className="bg-secondary w-12 h-12 rounded-md overflow-hidden">
            {group && group.picture && (
              <img alt={group.name} src={loader(group.picture, { w: 48, h: 48 })} />
            )}
          </div>

          <div>
            <H3>{group?.name || '<unnamed>'}</H3>

            {group && group.about && <Muted>{group.about}</Muted>}
          </div>
        </div>

        <Button className="ml-auto" variant="outline" asChild>
          <Link to={`${location.pathname}/edit-group`}>Edit Group</Link>
        </Button>
      </div>

      <div className="flex gap-4 w-full h-full">
        <Card className="w-full transition-colors duration-300 hover:border-purple-600">
          <CardContent className="flex flex-col gap-4">
            <div className="pt-4">
              <Link to={`${location.pathname}/group-admins`}>
                <Button className="text-xl font-semibold" variant="link">
                  Admins ({admins.length})
                </Button>
              </Link>
            </div>

            <Separator />

            <CardDescription>
              {admins.slice(0, 5).map((admin) => (
                <UserInfoRow key={admin.publicKey} pubkey={admin.publicKey} />
              ))}
            </CardDescription>

            {admins.length > 5 && (
              <Link to={`${location.pathname}/group-admins`}>
                <Button variant="ghost" size="sm">
                  View All Admins <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        <Card className="w-full transition-colors duration-300 hover:border-purple-600">
          <CardContent className="flex flex-col gap-4">
            <div className="pt-4">
              <Link to={`${location.pathname}/group-members`}>
                <Button className="text-xl font-semibold" variant="link">
                  Members ({members.length})
                </Button>
              </Link>
            </div>

            <Separator />

            <CardDescription>
              {members.slice(0, 5).map((member) => (
                <UserInfoRow pubkey={member.publicKey} key={member.publicKey} />
              ))}
            </CardDescription>

            {members.length > 5 && (
              <Link to={`${location.pathname}/group-members`}>
                <Button variant="ghost" size="sm">
                  View All Members <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
