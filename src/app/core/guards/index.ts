import { UserGuard } from './user.guard';
export { UserGuard } from './user.guard';
import { NoUserGuard } from './no-user.guard';
export { NoUserGuard } from './no-user.guard';
import { GameGuard } from './game.guard';
export { GameGuard } from './game.guard';

export const GUARDS: any[] = [
  UserGuard,
  NoUserGuard,
  GameGuard
];
