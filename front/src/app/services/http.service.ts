import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Order} from './../order';


@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    getOrders():Observable<Order[]> {
        return this.http.get<Order[]>('http://localhost:4000/api/getorders');
    }

    putOrderStatus(id:string, status:string, channelId:string):Observable<Order> {
        let req = {id: id, status: status, channelId: channelId};
        return this.http.put<Order>('http://localhost:4000/api/putorder', req);
    }
}
