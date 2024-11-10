import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

type Props = {
  title?: string;
  linkTo?: string;
};

export const CardContainer = ({ children, linkTo, title }: PropsWithChildren<Props>) => {
  return (
    <Card className="w-full transition-all ease-out duration-500 hover:shadow-purple-800/20 hover:border-purple-600/30 hover:shadow-lg">
      <CardContent className="p-6 flex flex-col gap-4">
        {title && (
          <>
            <div>
              {linkTo ? (
                <Link
                  to={linkTo || ''}
                  className="text-xl font-semibold hover:underline hover:cursor-pointer"
                >
                  {title}
                </Link>
              ) : (
                <div className="text-xl font-semibold">{title}</div>
              )}
            </div>

            <Separator />
          </>
        )}

        {children}
      </CardContent>
    </Card>
  );
};
