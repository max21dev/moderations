import { Fragment } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';

import { LoaderData } from '@/shared/types';
import { ellipsis } from '@/shared/utils';

export const Breadcrumbs = () => {
  const { crumbs } = useLoaderData() as LoaderData;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {crumb.to ? (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={crumb.to}>{ellipsis(crumb.label, 30)}</Link>
                  </BreadcrumbLink>
                </>
              ) : (
                <BreadcrumbPage>{ellipsis(crumb.label, 30)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {crumb.to && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
