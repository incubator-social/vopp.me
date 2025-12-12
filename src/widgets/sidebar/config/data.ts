import Home from '@/src/shared/assets/icons/home-outline.svg';
import Plus from '@/src/shared/assets/icons/plus-square-outline.svg';
import Person from '@/src/shared/assets/icons/person-outline.svg';
import Message from '@/src/shared/assets/icons/message-circle-outline.svg';
import Search from '@/src/shared/assets/icons/search-outline.svg';
import Statistics from '@/src/shared/assets/icons/trending-up-outline.svg';
import Favorites from '@/src/shared/assets/icons/bookmark-outline.svg';
import Logout from '@/src/shared/assets/icons/log-out-outline.svg';
import HomeActive from '@/src/shared/assets/icons/home.svg';
import PlusActive from '@/src/shared/assets/icons/plus-square.svg';
import PersonActive from '@/src/shared/assets/icons/person.svg';
import MessageActive from '@/src/shared/assets/icons/message-circle.svg';
import FavoritesActive from '@/src/shared/assets/icons/bookmark.svg';
import { OptionType } from '@/src/widgets/sidebar/lib';

export const OptionId = {
  feed: 'feed',
  create: 'create',
  myProfile: 'profile',
  messenger: 'messenger',
  search: 'search',
  statistics: 'statistics',
  favorites: 'favorites',
  logout: 'logout'
};

export const options: OptionType[] = [
  { label: 'Feed', icon: Home, activeIcon: HomeActive, id: OptionId.feed },
  { label: 'Create', icon: Plus, activeIcon: PlusActive, id: OptionId.create },
  { label: 'My Profile', icon: Person, activeIcon: PersonActive, id: OptionId.myProfile },
  { label: 'Messenger', icon: Message, activeIcon: MessageActive, id: OptionId.messenger },
  { label: 'Search', icon: Search, activeIcon: Search, id: OptionId.search },
  { label: 'Statistics', icon: Statistics, activeIcon: Statistics, id: OptionId.statistics },
  { label: 'Favorites', icon: Favorites, activeIcon: FavoritesActive, id: OptionId.favorites },
  { label: 'Log Out', icon: Logout, activeIcon: Logout, id: OptionId.logout }
];
