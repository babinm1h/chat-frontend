import cn from 'classnames';
import React, { FC, PropsWithChildren } from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { StMenuItem } from '../../../../../../../styles/common';

interface IProps {
  to: string;
  centered?: boolean;
}

const MenuLink: FC<PropsWithChildren<IProps>> = ({ to, children, centered = false }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink to={to}>
      <StMenuItem className={cn({ active: match })} centered={centered}>
        {children}
      </StMenuItem>
    </NavLink>
  );
};

export default MenuLink;
