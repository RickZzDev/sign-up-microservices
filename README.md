Claro, vou adicionar um diagrama de fluxo que ilustra as relações entre os serviços e suas interações com as filas do RabbitMQ no README. Aqui está o README atualizado com o diagrama de fluxo:

## Microserviços utilizando Nest.js

Este projeto consiste em dois microserviços desenvolvidos utilizando o framework Nest.js:

1. **notification_service:** Este microserviço é responsável por enviar notificações aos usuários, como por exemplo, e-mails de boas-vindas, confirmação de cadastro, entre outros.

2. **sign_up_service:** Este microserviço lida com o processo de cadastro de novos usuários. Ele utiliza o Firebase Auth para criar as credenciais dos usuários e, em seguida, emite um evento em uma fila do RabbitMQ. Posteriormente, ele lê essa fila para obter as credenciais criadas, cadastra o usuário em um banco de dados SQLite e emite um evento em outra fila que o microserviço de notification_service lê para enviar um e-mail de boas-vindas ao usuário.

### Configuração do Projeto

Antes de executar os microserviços, certifique-se de ter o Node.js e o Nest.js instalados em seu ambiente de desenvolvimento. Você pode instalá-los executando:

```bash
# Instalação do Node.js (caso ainda não tenha)
https://nodejs.org/

# Instalação do Nest.js
npm install -g @nestjs/cli

```

### Executando os Microserviços


0. **iniciar container rabbitMq:**

   ```bash
   # Navegue até o diretório do microserviço
   cd sign_up_service

   # Inicie o container
   docker compose up
   ```


1. **notification_service:**

   ```bash
   # Navegue até o diretório do microserviço
   cd notification_service

   # Instale as dependências
   npm install

   # Iniciar o prisma
   npx prisma init

   # Rodar migrations
   npx prisma migrate


   # Execute o microserviço em modo de desenvolvimento
   npm run start:dev
   ```

2. **sign_up_service:**

   ```bash
   # Navegue até o diretório do microserviço
   cd sign_up_service

   # Instale as dependências
   npm install

   # Iniciar o prisma
   npx prisma init

   # Rodar migrations
   npx prisma migrate

   # Execute o microserviço em modo de desenvolvimento
   npm run start:dev
   ```

### Configuração do Firebase Auth

Certifique-se de configurar as credenciais do Firebase Auth no microserviço de sign_up_service. Você pode obter essas credenciais no Console do Firebase.

### Configuração do RabbitMQ

Certifique-se de ter o RabbitMQ instalado e em execução em sua máquina. Você pode encontrar instruções de instalação em: [https://www.rabbitmq.com/](https://www.rabbitmq.com/)

### Diagrama de Fluxo

![Diagrama de Fluxo](https://example.com/diagrama-de-fluxo.png)

### Observações

- Certifique-se de configurar corretamente as variáveis de ambiente necessárias nos arquivos `.env` de cada microserviço. Exemplo:

  ```
  PORT=3000
  DATABASE_URL=sqlite://./database.db
  FIREBASE_API_KEY=sua_chave_api_firebase
  RABBITMQ_URL=amqp://localhost
  ```

- Este projeto é apenas um exemplo simplificado e pode necessitar de ajustes e configurações adicionais para uso em produção.

Para mais informações sobre o desenvolvimento e configuração dos microserviços, consulte a documentação oficial do Nest.js: [https://docs.nestjs.com/](https://docs.nestjs.com/)


```
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⡠⢠⡆⣀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣾⣿⣿⣿⣿⣷⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣼⣿⣿⣿⣿⣿⣿⣿⣷⡶⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀                        
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⣿⣿⣿⣿⣿⣿⣿⣿⣿⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣸⠿⠿⠿⠛⠛⠛⠛⠛⠃⠠⠤⡀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠆⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⠀⠀⢀⢀⣀⠠⠄⠀⠀⠀⠀⠀⠐⠒⠶⠌⡀⠀⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⠀⢀⠄⠊⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠠⠀⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⠀⡐⠁⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣶⡄⠀⠀⠀⠀⠀⢁⠀⠀⠀⠀⠀
            ⠀⠀⠀⠀⡐⠀⠀⠀⠀⠀⠀⠀⣾⠿⡛⠛⠛⠿⣷⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀
            ⠀⠀⠀⢠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⢠⡇⢀⢎⡷⡄⠀⠀
            ⠀⠀⠀⡌⠀⠀⢸⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡠⢣⣟⡞⠀⠀⠀
            ⠀⠀⠰⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘⣱⢯⠏⠘⡄⠀⠀
            ⠀⢠⠇⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢌⡼⣳⠋⠀⠀⣠⠀⠀
            ⠀⠸⢶⡤⠄⢀⣀⡇⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣠⢂⣞⣽⡗⠂⠀⢻⠋⠀⠀
            ⠀⠀⢀⠃⠀⢀⣹⣧⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⡿⢁⢎⣾⣿⣷⣦⠀⠈⡆⠀⠀
            ⠀⠀⡘⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣠⣯⣿⣿⣿⣿⡿⠀⠀⢰⠀⠀
            ⠀⢀⠃⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⣴⣷⣿⣿⣿⣿⣿⡇⠀⠀⠈⡆⠀
            ⠀⠈⠀⠀⠀⣸⠟⠟⠉⠋⠈⠁⠈⠁⠈⠀⠈⠀⠃⠘⠀⠉⠹⠉⣷⠀⠀⠀⠃⠀
            ⠀⡆⠀⠀⢠⡻⠤⠤⠖⠲⠒⠲⠒⡞⢳⣾⠗⠖⠲⠒⠻⠒⠒⠚⡅⢃⠀⠀⢰⠀
            ⢠⣁⣀⣀⡀⢇⣀⣠⣤⣤⣴⣦⠎⡰⣿⣯⣴⣶⣶⣦⣴⣤⣦⣤⠁⢸⣶⣾⣿⣇
            ⢸⣿⣿⣿⠇⢼⣿⣿⣿⣿⡿⠃⠜⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠸⣿⣿⣿⡿




__________.__        __    __________        ________               
\______   \__| ____ |  | __\____    /________\______ \   _______  __
 |       _/  |/ ___\|  |/ /  /     / \___   / |    |  \_/ __ \  \/ /
 |    |   \  \  \___|    <  /     /_  /    /  |    `   \  ___/\   / 
 |____|_  /__|\___  >__|_ \/_______ \/_____ \/_______  /\___  >\_/  
        \/        \/     \/        \/      \/        \/     \/      


```



