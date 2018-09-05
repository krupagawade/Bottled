import React from 'react';
import { NavItem } from 'react-materialize';
import asyncComponent from '../utils/asyncComponent';

const Button = asyncComponent(() => import('./Button'));

const NavBarItem = ({...props, onClick, iconName, children }) => (
  <NavItem onClick={onClick}>
    <Button large iconName={iconName} {...props}>
    </Button>
  </NavItem>
);

export default NavBarItem;
