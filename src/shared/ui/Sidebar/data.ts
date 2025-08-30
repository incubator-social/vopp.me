import { ElementType } from 'react';
import Home from '../../assets/icons/home-outline.svg';
import Plus from '../../assets/icons/plus-square-outline.svg';
import Person from '../../assets/icons/person-outline.svg';
import Message from '../../assets/icons/message-circle-outline.svg';
import Search from '../../assets/icons/search-outline.svg';
import Statistics from '../../assets/icons/trending-up-outline.svg';
import Favorites from '../../assets/icons/bookmark-outline.svg';
import Logout from '../../assets/icons/log-out-outline.svg';
//active icons
import HomeActive from '../../assets/icons/home.svg';
import PlusActive from '../../assets/icons/plus-square.svg';
import PersonActive from '../../assets/icons/person.svg';
import MessageActive from '../../assets/icons/message-circle.svg';
import FavoritesActive from '../../assets/icons/bookmark.svg';

export const options: Options = {
  main: [
    { value: 'Feed', icon: Home, activeIcon: HomeActive, action: () => console.log('Navigate to Feed') },
    { value: 'Create', icon: Plus, activeIcon: PlusActive, action: () => console.log('Navigate to Create') },
    {
      value: 'My Profile',
      icon: Person,
      activeIcon: PersonActive,
      action: () => console.log('Navigate to My Profile')
    },
    {
      value: 'Messenger',
      icon: Message,
      activeIcon: MessageActive,
      action: () => console.log('Navigate to Messenger')
    },
    { value: 'Search', icon: Search, activeIcon: Search, action: () => console.log('Navigate to Search') }
  ],
  other: [
    {
      value: 'Statistics',
      icon: Statistics,
      activeIcon: Statistics,
      action: () => console.log('Navigate to Statistics')
    },
    {
      value: 'Favorites',
      icon: Favorites,
      activeIcon: FavoritesActive,
      action: () => console.log('Navigate to Favorites')
    }
  ],
  logout: [{ value: 'Log Out', icon: Logout, activeIcon: Logout, action: () => console.log('Navigate to Log Out') }]
};

//types
type Options = {
  main: Option[];
  other: Option[];
  logout: Option[];
};

export type Option = {
  value: string;
  icon: ElementType;
  activeIcon: ElementType;
  action?: () => void;
};
