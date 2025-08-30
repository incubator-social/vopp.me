import Link from 'next/link';
import { Button } from '@/src/shared/ui/button/Button';

type LinkButtonProps = {
  href: string;
  title: string;
  variant: string;
  size?: string;
};

export const LinkButton = ({ href, title, variant, size = 'ButtonBig' }: LinkButtonProps) => {
  return (
    <Link href={href} passHref>
      <Button title={title} variant={variant} size={size} />
    </Link>
  );
};
