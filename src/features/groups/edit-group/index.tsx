import { useParams } from 'react-router-dom';

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

import { GroupSummary } from '@/features/groups';
import { useGroupDetails, useGroupModeration } from '@/shared/hooks';

export const EditGroup = () => {
  const { groupId } = useParams();

  const { group } = useGroupDetails({ groupId });

  const { deleteGroup } = useGroupModeration({ groupId });

  if (!groupId) return null;

  return (
    <>
      <div className="mb-4 w-full">{group && <GroupSummary group={group} />}</div>

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
