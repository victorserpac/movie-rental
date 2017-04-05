# Especificação do Web Service

Breve documentação da API

## Usuário

### Criar usuário

	POST /user
	
#### Parâmetros

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| name		   | String    |  Nome do usuário                     |
| email	   | String    |  Email do usuário                    |
| password   | String    |  Senha do usuário                    |

#### Resposta

##### Sucesso

```
```

##### Erro

```
```

### Login de usuário

	GET /user/login
	
#### Parâmetros

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| email	   | String    | Email do usuário                     |
| password   | String    | Senha do usuário                     |

#### Resposta

##### Sucesso

```
```

##### Erro

```
```

### Logout de usuário

	GET /user/logout
	
#### Parâmetros

Sem parâmetros

#### Resposta

##### Sucesso

```
```

##### Erro

```
```


## Filme

### Listar filmes

	GET /movie

#### Parâmetros

#### Resposta

##### Sucesso

```
```

##### Erro

```
```

### Locar filme

	POST /movie/rent

#### Parâmetros

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| movie_id   | Int       | ID do filme                          |
| user_id	   | Int       | ID do user                           |

#### Resposta

##### Sucesso

```
```

##### Erro

```
```

### Devolver filme

	POST /movie/return

#### Parâmetros

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| movie_id   | Int       | ID do filme                          |
| user_id	   | Int       | ID do user                           |

#### Resposta

##### Sucesso

```
```

##### Erro

```
```

### Pesquisar filme pelo título

	GET /movie/search

#### Parâmetros

| Nome       | Tipo      | Descrição                            |
|------------|-----------|--------------------------------------|
| query      | String    | String a ser buscada                 |

#### Resposta

##### Sucesso

```
```

##### Erro

```
```




## Models

- User
	- Email
	- Nome
	- Senha
- Movie
	- ID
	- Título
	- Diretor
- Mídia
	- Código
	- ID do Filme
- Aluguel
	- ID do User
	- ID da Mídia

	
