import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('api/chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async fetchChats(
    @Query('page') page: number,
    @Query('pageSize') pageSize?: number,
  ) {
    console.debug(`chat|page:${page}|pageSize:${pageSize}`);
    return await this.chatService.fetchChats({ page, pageSize });
  }

  @Post()
  async createChat(
    @Request() request,
    @Body() { title, hashtags }: CreateChatDto,
  ) {
    return await this.chatService.createChat({
      title,
      hashtags,
      createdBy: request.user.sub,
    });
  }
}
