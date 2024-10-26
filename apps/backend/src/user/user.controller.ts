import { Body, Controller, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './user.dto';
import { UserService } from './user.service';
import { type ClerkUserIdType, ClerkUserId } from '../auth/clerk';
import { UseClerkGuard } from '../auth/clerk.guard';

@Controller('user')
@UseClerkGuard()
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Patch()
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ type: UserDto })
  @ApiUnauthorizedResponse()
  async update(
    @ClerkUserId() clerkUserId: ClerkUserIdType,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.get({ clerkUserId });
    const updatedUser = await this.userService.update({ user, updateUserDto });
    return UserDto.create(updatedUser);
  }
}
