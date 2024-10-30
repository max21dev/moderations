import { useParams } from 'react-router-dom';

import { Breadcrumbs } from '@/features/breadcrumbs';
import { useGroupDetails } from '@/features/group/group-details/hooks';

import { CardContainer } from '@/shared/components/card-container';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

import { useGroupModeration } from '@/shared/hooks';
import { loader } from '@/shared/utils';

export const EditGroupPage = () => {
  const { groupId } = useParams();

  const { group } = useGroupDetails({ groupId });

  const { deleteGroup } = useGroupModeration({ groupId });

  if (!groupId) return null;

  return (
    <>
      <Breadcrumbs />

      <div className="mb-4 w-full flex items-center">
        <h3>Edit Group</h3>
      </div>

      <div className="mb-4 flex items-center">
        <div className="flex items-center gap-2">
          <div className="bg-secondary w-12 h-12 rounded-md overflow-hidden shrink-0">
            {group && group.picture && (
              <img alt={group.name} src={loader(group.picture, { w: 48, h: 48 })} />
            )}
          </div>

          <div>
            <h3>{group?.name || '<unnamed>'}</h3>
          </div>
        </div>
      </div>

      <CardContainer title="Danger Zone">
        <Dialog>
          <DialogTrigger>
            <Button variant="destructive">Delete Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your group.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={deleteGroup}>
                  Delete Group
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContainer>
    </>
  );
};
