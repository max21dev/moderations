import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

type Props = {
  title: string;
  linkTo?: string;
};

export const CardContainer = ({ children, linkTo, title }: PropsWithChildren<Props>) => {
  return (
    <Card className="w-full transition-colors duration-300 hover:border-purple-600">
      <CardContent className="flex flex-col gap-4">
        <div className="pt-4">
          {linkTo ? (
            <Link to={linkTo || ''}>
              <Button className="text-xl font-semibold" variant="link">
                {title}
              </Button>
            </Link>
          ) : (
            <div className="text-xl font-semibold">{title}</div>
          )}
        </div>

        <Separator />

        <CardDescription>{children}</CardDescription>
      </CardContent>
    </Card>
  );
};
