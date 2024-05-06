# GC.UI

* Vue 3 in Vite
* Esse projeto consiste no frontend do gerenciador de cadastro.
* Consome a API do backend utilizando axios.
* SPA com 3 telas (cliente, produto e pedido) cada uma delas permite que seja feito o CRUD dos dados.

  # Tela Cliente
  ![Captura de tela 2024-05-06 090215](https://github.com/sophia-luna/gc-frontend/assets/137638625/b6a4e171-1742-4664-85f1-182bcd51efc2)
  Clientes cadastrados e seus respecctivos dados.

    ## Cadastro de cliente
    ![Captura de tela 2024-05-06 090240](https://github.com/sophia-luna/gc-frontend/assets/137638625/61ed5e15-eac5-458f-87b6-b2c0fa96c400)
    Inserção de novo cliente.

    ## Edição de cliente
    ![Captura de tela 2024-05-06 092151](https://github.com/sophia-luna/gc-frontend/assets/137638625/4903a3c3-0b30-4bd8-b8c6-d343afa431cd)
    Edição de cliente existente clicando no ícone de lapis em frente ao cliente que deseja editar + popup de confirmação das alterações do cliente selecionado.

    ## Exclusão de cliente
    ![Captura de tela 2024-05-06 092207](https://github.com/sophia-luna/gc-frontend/assets/137638625/ae8d328c-ef86-4113-b4a5-e759705a3023)
    Popup de confirmação para deletar cliente existente.

  # Tela Produto
  ![Captura de tela 2024-05-06 090251](https://github.com/sophia-luna/gc-frontend/assets/137638625/26551be4-3433-4f2b-a754-04d7f5a170dc)
  Produtos cadastrados e seus respecctivos dados.

    ## Cadastro de produto
    ![Captura de tela 2024-05-06 090301](https://github.com/sophia-luna/gc-frontend/assets/137638625/98e0f7e9-e750-43f8-94f8-936a3c9966d3)
    Inserção de novo produto.

    ## Edição de produto
    ![Captura de tela 2024-05-06 092835](https://github.com/sophia-luna/gc-frontend/assets/137638625/d38dbff5-d02d-41f4-bef4-ea5b8668dd23)
    Edição de produto existente clicando no ícone de lapis em frente ao produto que deseja editar + popup de confirmação das alterações do produto selecionado.

    ## Exclusão de produto
    ![Captura de tela 2024-05-06 092850](https://github.com/sophia-luna/gc-frontend/assets/137638625/2209dd68-8609-4bd3-b222-fe9a2d283d6c)
    Popup de confirmação para deletar produto existente.

  # Tela Pedido
  ![Captura de tela 2024-05-06 090316](https://github.com/sophia-luna/gc-frontend/assets/137638625/3946a282-8456-49a6-a788-e5387e591b6e)
  Pedidos cadastrados e seus respectivos dados.

    ## Detalhes do pedido
    ![Captura de tela 2024-05-06 093030](https://github.com/sophia-luna/gc-frontend/assets/137638625/a90431bf-3659-49c1-9eaa-1f05132f297e)
    ![Captura de tela 2024-05-06 093039](https://github.com/sophia-luna/gc-frontend/assets/137638625/768e8628-0495-4a7a-87c3-968d0a9cfdc1)
    ![Captura de tela 2024-05-06 093048](https://github.com/sophia-luna/gc-frontend/assets/137638625/a7159f03-5452-43f4-b848-ed7fb17af827)
    Visualização de detalhes do pedido clicando no ícone de olho em frente ao produto que deseja selecionar + exibição em sanfona dos detalhes do cliente e produtos do pedido selecionado.
    
    ## Cadastro de pedido
    ![Captura de tela 2024-05-06 090337](https://github.com/sophia-luna/gc-frontend/assets/137638625/dab16788-dc75-43a1-86c7-fd5d1057b384)
    ![Captura de tela 2024-05-06 090402](https://github.com/sophia-luna/gc-frontend/assets/137638625/07f45a2f-e57c-4257-b4b5-6e22c715fe9b)
    Inserção de novo pedido selecionando o cliente e os produtos + popup de confirmação exibindo o valor total do pedido.

    ## Exclusão de pedido
    ![Captura de tela 2024-05-06 093153](https://github.com/sophia-luna/gc-frontend/assets/137638625/d9f01514-3b01-4eab-90ab-b20dbc872752)
    Popup de confirmação para deletar pedido existente.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
