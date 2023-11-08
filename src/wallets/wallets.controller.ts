import { Controller, Get, Body, Patch, Param, Delete} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('all')
  findAll() {
    return this.walletsService.findAll();
  }

  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(id, updateWalletDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(id);
  }
}
