import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { GlobalService } from 'src/app/services/global/global.service';
import firebase from 'firebase/compat/app';
import db from 'src/environments/configfb';

@Component({
  selector: 'app-asignar-orden',
  templateUrl: './asignar-orden.page.html',
  styleUrls: ['./asignar-orden.page.scss'],
})
export class AsignarOrdenPage implements OnInit {

  id: any;
  userId: any;
  isLoading: boolean;
  order :any;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cartService: CartService,
    private global: GlobalService
  ) { }

  ngOnInit() {    
    const id = this.route.snapshot.paramMap.get('orderId');
    const userId = this.route.snapshot.paramMap.get('userId');
    
    console.log('check id: ', id);
    if(!id) {
      this.navCtrl.back();
      return;
    } 
    this.id = id;
    this.userId = userId;
    console.log('id:', this.id);
    console.log('User ID: ', this.userId);

    this.getOrdenes();
  }

  async getOrdenes() {
    try {      
      const orderRef =  db.collection('orders').doc(this.userId).collection('all').doc(this.id);
      console.log('Orders: ', this.order);
      this.isLoading = false;
      // this.allItems.forEach((element, index) => {
        //     this.allItems[index].quantity = 0;
        //   });
        orderRef.onSnapshot( snap =>{
          console.log('Snap', snap.data()),
          this.order= snap.data()})
          console.log('ESTA ORDEN', this.order)
    } catch(e) {
      console.log(e);
      this.isLoading = false;
      this.global.errorToast();
    }
  }
}
