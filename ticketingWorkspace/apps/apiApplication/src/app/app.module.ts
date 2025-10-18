import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingService } from './booking/booking.service';
import { BookingModule } from './booking/booking.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [BookingModule,HttpModule],
  controllers: [AppController],
  providers: [AppService, BookingService],
})
export class AppModule {}
