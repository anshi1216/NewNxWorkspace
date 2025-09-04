import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BookingService {


    constructor(private http: HttpService){

    }


    async addData(event : any){
        console.log("approved",event);
        event.status = "pending";
       const res$ =   await this.http.post('http://localhost:3004/events',event);
      //res.subscribe((res) => console.log("success",res.data),(error) => console.log("error",error));
      await firstValueFrom(res$);
    }

     async updateUser(id: string, updateUserDto: any) {
    const url = `http://localhost:3004/events/${id}`;
    const response$ = this.http.put(url, updateUserDto);
    const res =  await firstValueFrom(response$);
    return res.data;
  }

  async fetchUsers(status: string) {
    const url = 'http://localhost:3004/events';
    const params = { status };
    const response$ = this.http.get(url, { params });
    const res =  await firstValueFrom(response$);
    return res.data;
  }

  async fetchAllEvents() {
    const url = 'http://localhost:3004/events';
    const response$ = this.http.get(url);
    const res =  await firstValueFrom(response$);
    return res.data;
  }

}
