## Descrição



## Executando a aplicação
Para executar a aplicação faça uma cópia do arquivo `.env.example` dentro da raiz do projeto e renomeie a cópia para `.env`. O arquivo já está populado para uso em ambiente local.

Após realizar o passo acima, execute o comando `npm ci` para instalar as dependências do projeto, neste momento será criado uma pasta chamada `node_modules`na raiz do projeto.

Após instalada as dependências, no terminal execute o comando `npm run dev` para iniciar o servidor local. Lembre-se que para todos os casos o Node.JS deve estar instalado no seu computador.

Se tudo ocorrer certo, você receberá a seguinte mensagem no terminal `🚀 Server is running at http://localhost:3333`, você pode acessar o endereço e irá se deparar com a tela de login da aplicação.

Por padrão, em ambiente local será adicionado automaticamente um usuário com as seguintes credenciais `email: admin@admin.com` e senha `admin123`

Sempre que um usuário for adicionado no dashboard ele poderá acessar a aplicação, utilizando o e-mail cadastrado e a senha será que vem antes do arroba do e-mail adicionado do numero 123, ex: foi criado um usuário com o e-mail fulano@provider.com, para fazer login com esse usuário basta usar este e-mail e a senha será fulano123.