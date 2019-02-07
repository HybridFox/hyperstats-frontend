import { AdminGuard } from './admin.guard';
export { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
export { AuthGuard } from './auth.guard';

export const Guards = [
    AdminGuard,
    AuthGuard,
];
