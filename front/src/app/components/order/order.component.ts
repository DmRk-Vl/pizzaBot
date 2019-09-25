import { Component, OnInit } from '@angular/core';
import { HttpService} from './../../services/http.service';
import {Order} from './../../order';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    providers: [HttpService]
})
export class OrderComponent implements OnInit{
    orders: Order[] = [];

    constructor(private httpService: HttpService){}

    //Получает список заказов.
    GetOrders() {
      this.httpService.getOrders().subscribe(data => {
        this.orders = data;
        console.log("data");
      });
    }

    //Устанавливает новый статус.
    setOrderStatus(id:string, status:string, channelId:string) {
      for (let i = 0; i < this.orders.length; i++){
        if (this.orders[i]._id == id){
          this.httpService.putOrderStatus(id, status, channelId).subscribe(data => {
            this.orders[i] = data;
          });
          break;
        }
      }
    }

    //Преобразует статус заказа из латиницы в кириллицу.
    convertStatusForUser(status) {
      switch (status) {
        case "rejected": {
          return "Отменен";
        }
        case "completed": {
          return "Завершен";
        }
        case "confirmed": {
          return "Подтвержден";
        }
        case "new": {
          return "Новый";
        }
        default: {
          return "ERROR";
        }
      }
    }

    ngOnInit() {
      this.GetOrders();
    }
}
