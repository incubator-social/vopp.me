import { ElementType } from 'react';
import Home from '@/src/shared/assets/icons/home-outline.svg';
import Plus from '@/src/shared/assets/icons/plus-square-outline.svg';
import Person from '@/src/shared/assets/icons/person-outline.svg';
import Message from '@/src/shared/assets/icons/message-circle-outline.svg';
import Search from '@/src/shared/assets/icons/search-outline.svg';
import Statistics from '@/src/shared/assets/icons/trending-up-outline.svg';
import Favorites from '@/src/shared/assets/icons/bookmark-outline.svg';
import Logout from '@/src/shared/assets/icons/log-out-outline.svg';
//active icons
import HomeActive from '@/src/shared/assets/icons/home.svg';
import PlusActive from '@/src/shared/assets/icons/plus-square.svg';
import PersonActive from '@/src/shared/assets/icons/person.svg';
import MessageActive from '@/src/shared/assets/icons/message-circle.svg';
import FavoritesActive from '@/src/shared/assets/icons/bookmark.svg';

export type Option = {
  id: OptionId;
  label: string;
  icon: ElementType;
  activeIcon: ElementType;
};

export const enum OptionId {
  Feed = 'feed',
  Create = 'create',
  MyProfile = 'profile',
  Messenger = 'messenger',
  Search = 'search',
  Statistics = 'statistics',
  Favorites = 'favorites',
  Logout = 'logout'
}

export const options: Option[] = [
  { label: 'Feed', icon: Home, activeIcon: HomeActive, id: OptionId.Feed },
  { label: 'Create', icon: Plus, activeIcon: PlusActive, id: OptionId.Create },
  { label: 'My Profile', icon: Person, activeIcon: PersonActive, id: OptionId.MyProfile },
  { label: 'Messenger', icon: Message, activeIcon: MessageActive, id: OptionId.Messenger },
  { label: 'Search', icon: Search, activeIcon: Search, id: OptionId.Search },
  { label: 'Statistics', icon: Statistics, activeIcon: Statistics, id: OptionId.Statistics },
  { label: 'Favorites', icon: Favorites, activeIcon: FavoritesActive, id: OptionId.Favorites },
  { label: 'Log Out', icon: Logout, activeIcon: Logout, id: OptionId.Logout }
];
