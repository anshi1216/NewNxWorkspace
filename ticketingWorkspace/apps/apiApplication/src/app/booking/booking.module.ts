import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { HttpModule } from '@nestjs/axios';
import { BookingService } from './booking.service';


@Module({
  imports: [HttpModule],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
