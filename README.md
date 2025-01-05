# Lupi Delivery (Teste Prático)

## Como rodar o projeto

Assim que fizer downlod do projeto, execute o seguinte comando para realizar a instalação das dependencias:

```
npm i --legacy-peer-deps
```

### Website

Para rodar o site de forma local utilize o comando:

```
ionic serve
```

> [!WARNING]
> Caso esteja no windows, execute o código no CMD. Por padrão o Powershell bloqueia a execução de scripts.

Será iniciado um servidor web local na porta 8100 onde o site será exibido.

### App Android

#### Android Studio

Utilize o seguinte comando 

```
npm run new-version
```

Ele executa os seguintes comandos 

```
ionic build --prod && npx cap copy && npx cap sync && npx cap open android
```

Ele irá sincronizar as alterações do código para o aplicativo e abrir o android studio no projeto. Onde após clicar para executar o projeto, o aplicativo será aberto no emulador embutido.

#### Mobile

Foi inserido o apk do aplicativo no seguinte caminho do projeto:

```
ionic-project\android\app\build\outputs\apk\debug\app-debug.apk
```

Ele pode ser transferido para o dispositivo móvel android e ser executado normalmente.

## Estrutura do código

A estrutura da página foi feita no módulo home.

A lógica do site pode ser dividida em 4 tipos CRUD Firestore, Botão de novo pedido, Botão de alteração de status e drag and drop dos pedidos.

### CRUD Firestore.

Foi criado um service angular onde foi adicionado 2 funções, responsáveis por adicionar e atualizar pedidos respectivamente.

```
  addPedido(pedido: any) {
    return this.firestore.collection(this.collectionName).add(pedido);
  }

  updatePedido(id: string, data: any) {
    return this.firestore.collection(this.collectionName).doc(id).update(data);
  }
```

No módulo Home há 4 funções para esta função.

#### Carregar pedidos

```
  fetchPedidos() {

  }
```

Executado assim que a aplicação inicia. É responsável por buscar os pedidos no banco de dados firestore, após isso ele atualiza as respectivas variáveis para exibir o conteudo no site.

#### Adicionar pedido

```
 criarPedido() {

}
```

Responsável por comunicar com o service angular e solicitar a criação de um novo pedido.

```
  atualizarStatusPedido() {

}
```

Responsável por comunicar com o service angular e solicitar a alteração do status do pedido.

### Botão de novo pedido 

```
 openAddOrderForm() {

}
```

Responsável por um abrir um modal com um formulário para adição de um novo pedido.
Ao clicar em "Adicionar" no formulário, ele se comunica **criarPedido** para realizar a criação de um novo pedido.

### Botão de alteração de status

```
  openDiv () {
  } 

 toggleOptions() {
  }

  clickOutside() {
  }

  selectOption(){
  }
```

A função **openDiv** e **toggleOptions** são responsáveis por abrir a caixa de diálogo onde é exibido as opções de novo status. a função **clickOutisde** se comunica com a diretiva **clickOutside** que é responsável por identificar cliques fora da caixa de diálogo em foco, desta forma a função homônima no módulo home realiza o fechamento da caixa de diálogo. Por fim a função **selectOption** identifica a opção que você escolheu e se comunica com a função **atualizarStatusPedido** enviando o status correspondente como parâmetro.

### Drag and Drop

```
     drop() {
    }
```

O funcionamento do drag and drop no site se faz por meio da biblioteca Angular SDK. A função **drop** faz controle de arrastar e permite ou bloqueia dependendo do contexto. Caso o pedido seja arrastado para outra coluna, ela permite que ele vá para outra coluna e em seguida aciona a função **atualizarStatusPedido** enviando o status respectivo da coluna como parâmetro para a função.

## Desafios encontrados

Por não ter muita experiência com Angular e Ionic me deparei com diversos desafios. Neste tópico citarei os principais.

### Angular 19 e Ionic 7.2.0

Ao iniciar o projeto por meio do CLI do Ionic, eu me deparei com um problema de dependencia ao iniciar o app Ionic por meio do android. O problema era causado por um conflito entre a versão recente mais estável do Angular com a versão recente mais estável do Ionic. O problema foi resolvido após realizar um pequeno downgrade para a versão 18 do Angular.

### Estrutura do Ionic

A estrutura de elementos HTML do Ionic no início foi meio confusa, mas com a prática foi possivel entender seu funcionamento.

```
<ion-grid class="home-grid">
  <ion-row class="full-height">
        <ion-col size-xs="12" size-sm="12" size-md="4" size-lg="4">
          <ion-card class="home-col">
            <ion-card-header>

            </ion-card-header>
          <ion-card-content>
          </ion-card-content>
          </ion-card class="home-col">
        </ion-col >
    ion-row class="full-height"
</ion-grid>
```

### Fechar elemento ao clicar fora.

A lógica para identificar um clique fora de um elemento e fecha-lo também foi um desafio. A lógica está vinculada a uma diretiva clickOutside, que aciona a função homônima do módulo home que realiza o fechamento dos elementos. Uma das dificuldades foi por quê cada elemento pertencia a um pedido diferente que era gerado de forma dinâmica ao criar um novo pedido, isso causou uma certa dificuldade por que inicialmente ao ter mais de um pedido, era gerado um comando para fecha-los antes mesmo de sequer abrir qualquer um deles. 
Foi possivel resolver este conflito ao vincular a lógica a apenas um elemento de cada vez. Ela é vinculada apenas ao elemento que está aberto.

### Drag and Drop 

O funcionamento do drag and drop também gerou uma certa dificuldade no começo. Era possivel arrastar os pedidos mas não conseguia faze-los mudar de coluna. Após um tempo consegui aplicar esta lógica por meio da função **transferArrayItem()**. Desta forma os pedidos mudam de coluna e em seguida iniciam uma requisição ao firestore para mudar o status do respectivo pedido.



