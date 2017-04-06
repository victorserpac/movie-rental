# Especificação do Web Service

Documentação da API

## Usuário

### Criar usuário

	POST /user

#### Body

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| name		   | String    |  Nome do usuário                     |
| email	   | String    |  Email do usuário                    |
| password   | String    |  Senha do usuário                    |

#### Respostas

##### Sucesso

```
HTTP/1.1 200 OK
{
  "name": "Victor Serpa do Carmo",
  "email": "victor.serpa.c@icloud.com",
  "password": "$2a$10$T9fUTylXu7M.P/j9V4ybPuMFz8ISCpm6cQh2mMbqwwPq5wcXpYeDi"
}
```

##### Erro

Endereço de email já cadastradado

```
HTTP/1.1 409 Conflict
{
  "success": false,
  "data": "Endereço de email já cadastrado"
}
```

### Login de usuário

	POST /user/login

#### Body

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| email	   | String    | Email do usuário                     |
| password   | String    | Senha do usuário                     |

#### Resposta

##### Sucesso

```
HTTP/1.1 200 OK
{
  "success": true,
  "token": "JWT eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVmljdG9yIFNlcnBhIGRvIENhcm1vIiwiZW1haWwiOiJ2aWN0b3Iuc2VycGEuY0BpY2xvdWQuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkMTRjSURkclREaFBXcVhLNnlRUFBpdUVnL1VyMFJCSTFvZ29GY0RGZi5nMld4SFBJT1hibUMifQ.p_-k3iJs-TCh7emZVU9ypF1UVW4xbKaBJr-TYZDnqMI"
}
```

##### Erro

```
HTTP/1.1 400 Bad Request
{
  "success": false,
  "data : "Falha na autenticação. Email ou senha incorreta."
}
```

### Logout de usuário

	GET /user/logout

#### Headers

| Nome          | Tipo      | Descrição                            |
|---------------|-----------|--------------------------------------|
| Authorization | String    | JWT Token recebido no login          |

#### Resposta

##### Sucesso

```
HTTP/1.1 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVmljdG9yIFNlcnBhIGRvIENhcm1vIiwiZW1haWwiOiJ2aWN0b3Iuc2VycGEuY0BpY2xvdWQuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAka2NGMVl6QkxxMVFObVFrUEQzRXdKdXVVbXNTVmJCNEp1UnB3Sjc3bTlQdEd0VkRBRlIvY2UifQ.QKlCqZzJaexD5RZTKzMpe_R3hEhCxKOJIXaUPBmD1Iw"
}
```

## Filme

### Listar filmes

	GET /movie

#### Resposta

Array de filmes

##### Sucesso

```
HTTP/1.1 200 OK
[
  {
    "id": 1,
    "title": "Into The Wild",
    "director": "Sean Penn"
  },
  {
    "id": 2,
    "title": "The Pursuit Of Happyness",
    "director": "Gabriele Muccino"
  },
  {
    "id": 3,
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont"
  }
]
```

### Locar filme

	POST /movie/rent

#### Headers

| Nome          | Tipo      | Descrição                            |
|---------------|-----------|--------------------------------------|
| Authorization | String    | JWT Token recebido no login          |

#### Body

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| movie_id   | Int       | ID do filme                          |

#### Resposta

##### Sucesso

```
HTTP/1.1 200 OK
{
  "code": 5,
  "movie_id": 1,
  "rented": true
}
```

##### Erro

Usuário não autenticado

```
HTTP/1.1 401 Unauthoried
{
	"success": false,
	"data": "Precisa estar logado"
}
```

```
HTTP/1.1 400 Bad Request
{
	"success": false,
	"data": "Não há mais DVDs disponíveis para este filme"
}
```

### Devolver filme

	POST /movie/giveback

#### Headers

| Nome          | Tipo      | Descrição                            |
|---------------|-----------|--------------------------------------|
| Authorization | String    | JWT Token recebido no login          |

#### body

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| media_code | Int       | ID da mídia dada como "code" na resposta da rota de locação                          |

#### Resposta

##### Sucesso

```
HTTP/1.1 200 OK
{
	"code": 2,
	"movie_id": 1,
	"rented": false
}
```

##### Erro

```
HTTP/1.1 401 Unauthoried
{
	"success": false,
	"data": "Precisa estar logado"
}
```

### Pesquisar filme pelo título

	GET /movie/search/:query

#### Parâmetros

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| query      | String    | String a ser buscada                 |

#### Resposta

##### Sucesso

```
HTTP/1.1 200 OK
[
  {
    "id": 1,
    "title": "Into The Wild",
    "director": "Sean Penn"
  }
]
```