import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private collectionName = 'orders';

  constructor(private firestore: AngularFirestore) {}

  addPedido(pedido: any) {
    return this.firestore.collection(this.collectionName).add(pedido);
  }

  updatePedido(id: string, data: any) {
    return this.firestore.collection(this.collectionName).doc(id).update(data);
  }
  
}
