import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('tickets')
export class BookingController {


    constructor(private bookservice : BookingService){}

     @Post()
  async addData(@Body() event : any){
    return this.bookservice.addData(event);
  }

   @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateEventDto: any) {
    return this.bookservice.updateUser(id, updateEventDto);
  }

   @Get()
  getUsers(@Query('status') status: string) {
    // role and active are extracted from the query string
    
    return this.bookservice.fetchUsers(status);
  }

   @Get()
  getAllEvents() {
    // role and active are extracted from the query string
    
    return this.bookservice.fetchAllEvents();
  }


}
