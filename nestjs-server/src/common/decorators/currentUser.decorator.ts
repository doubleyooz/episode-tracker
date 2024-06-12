import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/models/users/user.interface';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): User | undefined => {
  if (context.getType() === 'http')
    return context.switchToHttp().getRequest().user;
  if (context.getType() === 'rpc') return context.switchToRpc().getData().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
