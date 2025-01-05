import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PedidoService } from '../services/pedido.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop,  transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage  implements OnInit  {

  
  faRepeat = faRepeat;

  colunaNovo: any[] = [];
  colunaEmAndamento: any[] = [];
  colunaFinalizado: any[] = [];
  collectionName: string = 'orders';
  loading:boolean = false; 
  visibleOptions: string = "";


     drop(event: CdkDragDrop<any[]>) {
      if(event.previousContainer === event.container) {
return;
      } else {
        transferArrayItem(
          event.previousContainer.data, 
          event.container.data, 
          event.previousIndex, 
          event.currentIndex);
          const elementId: string = event.item.element.nativeElement.id.slice(4);
          const column: string = event.container.element.nativeElement.id;
          let status: string = "";
          switch(column) {
            case "coluna1": 
            status = "Novo"
            break;
            case "coluna2":
            status = "Em andamento"
            break;
            case "coluna3":
            status = "Finalizado" 
            break;
            default:
            status = "Novo"
            break
          }
          this.atualizarStatusPedido(elementId, status);
      }
    }

  constructor(private alertController: AlertController,  private firestore: AngularFirestore, private pedido: PedidoService) {}

    ngOnInit() {
    this.fetchPedidos();
  }

   async criarPedido(order: any) {
    this.loading = true; 
    order.status = "Novo";
    try {
          await this.pedido.addPedido(order);
    } catch (error) {
      console.error('Erro ao mover pedido:', error);
    } finally {
      this.loading = false; 
    }
  }

  async atualizarStatusPedido(id: string, status: string) {

   this.loading = true; 
    try {
          await this.pedido.updatePedido(id, {status: status});
    } catch (error) {
      console.error('Erro ao mover pedido:', error);
    } finally {
      this.loading = false; 
    } 
}
  
   fetchPedidos() {
    this.loading = true;
    this.firestore.collection('orders').valueChanges({ idField: 'id' }).subscribe({
      next:(pedidos: any[]) => {
      this.colunaNovo = pedidos.filter(pedido => pedido.status === 'Novo').map(pedido => { const date = new Date(pedido.createdAt.seconds * 1000); pedido.formattedDate = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`; return pedido});
      this.colunaEmAndamento = pedidos.filter(pedido => pedido.status === 'Em andamento').map(pedido => { const date = new Date(pedido.createdAt.seconds * 1000); pedido.formattedDate = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`; return pedido});
      this.colunaFinalizado = pedidos.filter(pedido => pedido.status === 'Finalizado').map(pedido => { const date = new Date(pedido.createdAt.seconds * 1000); pedido.formattedDate = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`; return pedido});

      this.loading = false;
    }, error: (err) => {
      console.log(`error in orders load: ${err}`)
    }
    });
  }
  


openDiv (orderId: string) {
  this.visibleOptions= orderId;
  setTimeout(() => {
    this.toggleOptions(orderId);
  }, 10);
} 

  toggleOptions(orderId: string): void {
    const optElem = document.getElementById(`opt-${orderId}`);
    if(optElem) {
optElem.classList.toggle("visible");
    }
  }

  clickOutside():void {
  const optElems = document.querySelectorAll(`.visible`);
    if(optElems) {
      optElems.forEach(elem => {
 elem.classList.remove("visible");
  }) 
  }
  }

   selectOption(id: string, param: number): void {
    console.log(param);
    let status:string = "";
    switch(param) {
      case 1:
        status= "Novo";
        break;
        case 2:
        status= "Em andamento";
        break;
        case 3:
        status= "Finalizado";
        break;
        default:
        status= "Novo";
        break;
    }

     this.atualizarStatusPedido(id, status); 
    this.clickOutside();
  }

  async openAddOrderForm() {
    
  const alert = await this.alertController.create({
    
      header: 'Adicionar Pedido',
      inputs: [
        {
          name: 'orderName',
          type: 'text',
          placeholder: 'Nome do Pedido',
        },
        {
          name: 'clientName',
          type: 'text',
          placeholder: 'Nome do Cliente',
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descrição',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Adicionar',
          handler: (data) => {
            this.criarPedido({customerName: data.clientName, orderName:data.orderName, description: data.description, createdAt: new Date()});
            console.log('Pedido adicionado:', data);
          },
        },
      ],
    });
    
    await alert.present();
    
  }   
}
