import { Link, Outlet } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { H3 } from '@/shared/components/ui/typography/h3';
import { Muted } from '@/shared/components/ui/typography/muted';

import { Breadcrumbs } from '@/features/breadcrumbs';

import { useActiveRelay, useRelayInformation } from '@/shared/hooks';
import { loader } from '@/shared/utils';

export const RelayPage = () => {
  const { activeRelay } = useActiveRelay();

  const { info } = useRelayInformation(activeRelay);

  return (
    <>
      <Breadcrumbs />

      <div className="w-full flex items-center">
        <div className="flex items-center gap-2">
          <div className="bg-secondary w-12 h-12 rounded-md overflow-hidden">
            {info && info.icon && <img alt={info.name} src={loader(info.icon, { w: 48, h: 48 })} />}
          </div>

          <div>
            <H3>{info?.name || '-No Name-'}</H3>

            {info && info.description && <Muted>{info.description}</Muted>}
          </div>
        </div>

        <Button className="ml-auto mr-2" variant="outline" asChild>
          <Link to={`${location.pathname}/edit-relay`}>Edit Relay</Link>
        </Button>

        <Button asChild>
          <Link to={`${location.pathname}/groups`}>View Groups</Link>
        </Button>
      </div>
    </>
  );
};

export const RelayLayout = () => {
  return <Outlet />;
};
