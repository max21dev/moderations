import { NDKKind, NDKPublishError } from '@nostr-dev-kit/ndk';
import { EyeClosedIcon, EyeIcon, LockIcon, LockOpenIcon } from 'lucide-react';
import { useNewEvent } from 'nostr-hooks';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

import { Breadcrumbs } from '@/features/breadcrumbs';

import { useNip29Ndk } from '@/shared/hooks';

export const NewGroupPage = () => {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [about, setAbout] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const { nip29Ndk } = useNip29Ndk();
  const { createNewEvent } = useNewEvent({ customNdk: nip29Ndk });

  const createGroup = () => {
    const event = createNewEvent();
    event.kind = NDKKind.GroupAdminCreateGroup;
    event.tags = [
      ['name', name],
      ['picture', picture],
      ['about', about],
      [isPublic ? 'public' : 'private'],
      [isOpen ? 'open' : 'closed'],
    ];
    event
      .publish()
      .catch(() => {
        if (event.publishError) {
          const ndkPublishError = event.publishError as NDKPublishError;
          const errors = ndkPublishError.errors.values();
          for (const error of errors) {
            console.error(error.message);
          }
        }
      })
      .then(() => {});
  };

  return (
    <>
      <Breadcrumbs />

      <div className="mb-4 w-full flex items-center">
        <h3>New Group</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="group-name">Name:</Label>
            <Input
              id="group-name"
              type="text"
              placeholder="The Cool Folks"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="group-picture">Picture (URL):</Label>
            <Input
              id="group-picture"
              type="text"
              placeholder="https://example.com/picture.jpg"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="group-about">About:</Label>
            <Input
              id="group-about"
              type="text"
              placeholder="We are the cool folks!"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Button
              disabled
              className="w-full gap-1"
              onClick={() => setIsPublic((prev) => !prev)}
              variant="outline"
            >
              {isPublic ? <EyeIcon className="w-4 h-4" /> : <EyeClosedIcon className="w-4 h-4" />}
              {isPublic ? 'Public' : 'Private'}
            </Button>
          </div>

          <div>
            <Button
              disabled
              className="w-full gap-1"
              onClick={() => setIsOpen((prev) => !prev)}
              variant="outline"
            >
              {isOpen ? <LockOpenIcon className="w-4 h-4" /> : <LockIcon className="w-4 h-4" />}
              {isOpen ? 'Open' : 'Closed'}
            </Button>
          </div>
        </div>

        <div>
          <Button size="lg" onClick={createGroup}>
            Create Group
          </Button>
        </div>
      </div>
    </>
  );
};
