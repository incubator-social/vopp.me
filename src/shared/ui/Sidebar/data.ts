import { ElementType } from 'react';
import Home from '../../assets/icons/home-outline.svg';
import Plus from '../../assets/icons/plus-square-outline.svg';
import Person from '../../assets/icons/person-outline.svg';
import Message from '../../assets/icons/message-circle-outline.svg';
import Search from '../../assets/icons/search-outline.svg';
import Statistics from '../../assets/icons/trending-up-outline.svg';
import Favorites from '../../assets/icons/bookmark-outline.svg';
import Logout from '../../assets/icons/log-out-outline.svg';

// active icons
import HomeActive from '../../assets/icons/home.svg';
import PlusActive from '../../assets/icons/plus-square.svg';
import PersonActive from '../../assets/icons/person.svg';
import MessageActive from '../../assets/icons/message-circle.svg';
import FavoritesActive from '../../assets/icons/bookmark.svg';

export const options: Option[] = [
  // MAIN
  { label: 'Feed', icon: Home, activeIcon: HomeActive, id: 'feed', group: 'main' },
  { label: 'Create', icon: Plus, activeIcon: PlusActive, id: 'create', group: 'main' },
  { label: 'My Profile', icon: Person, activeIcon: PersonActive, id: 'profile', group: 'main' },
  { label: 'Messenger', icon: Message, activeIcon: MessageActive, id: 'messenger', group: 'main' },
  { label: 'Search', icon: Search, activeIcon: Search, id: 'search', group: 'main' },
  { label: 'Statistics', icon: Statistics, activeIcon: Statistics, id: 'statistics', group: 'main' },
  { label: 'Favorites', icon: Favorites, activeIcon: FavoritesActive, id: 'favorites', group: 'main' },

  // ACTION
  { label: 'Log Out', icon: Logout, activeIcon: Logout, id: 'logout', group: 'actions' }
];

export type Option = {
  id: string;
  label: string;
  icon: ElementType;
  activeIcon: ElementType;
  group: 'main' | 'actions';
};
