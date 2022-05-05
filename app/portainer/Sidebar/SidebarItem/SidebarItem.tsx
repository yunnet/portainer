import { ReactNode } from 'react';

import { useAuthorizations } from '@/portainer/hooks/useUser';

import { Wrapper } from './Wrapper';
import { Link } from './Link';
import { Menu } from './Menu';
import { Icon } from './Icon';

type Props = {
  iconClass?: string;
  to: string;
  params?: object;
  label: string;
  children?: ReactNode;
  authorizations?: string[] | string;
  adminOnlyCE?: boolean;
};

export function SidebarItem({
  children,
  iconClass,
  to,
  params,
  label,
  authorizations = [],
  adminOnlyCE,
}: Props) {
  const head = (
    <Link to={to} params={params}>
      {label}
      {iconClass && <Icon iconClass={iconClass} />}
    </Link>
  );

  const isAuthorized = useAuthorizations(authorizations, adminOnlyCE);
  if (!isAuthorized) {
    return null;
  }

  return (
    <Wrapper label={label}>
      {children ? <Menu head={head}>{children}</Menu> : head}
    </Wrapper>
  );
}