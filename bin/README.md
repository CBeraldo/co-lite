# LEIAME #

### Sobre o repositório ###

* ORM SQLite simples para cordova.

### Versões ###

* 1.0.3:
    - Atualização da documentação.
* 1.0.2:
    - Disponibilização da documentação.
* 1.0.1:
    - Otimização do diretório de arquivos.
* 1.0.0:
    - Funcionalidades básicas: insert, update, delete, select, create (table) e implementação de objetos.

### Por onde começar? ###

* npm init
* npm install --save co-lite
* npm install

### Exemplos ###

* Definindo módulo angularjs.

```
var mymodule = angular.module('mymodule', ['Colite']);
```

* Definindo e disponibilizando um objeto via angular service.

```
mymodule.service("Produto", function($colite, Colite) {
    var produto;

    produto = $colite.implement("Produto", {
        id: {
            type: Colite.INTEGER,
            primaryKey: true
        },
        descricao: {
            type: Colite.STRING,
            allowNulls: false
        },
        valor: {
            type: Colite.DECIMAL,
            allowNulls: false
        }
    });

    return produto;
});
```

* Utilização em controlatores angularjs.

```
mymodule.controller('teste', function($scope, $colite, Produto) {
    $colite.deviceready(function() {
        $scope.$apply(function() {
            try {
                Produto.insert(produto)
                    .then(function(data) { })
                    .catch(function(error) { });

                Produto.update(produto)
                    .then(function(data) { })
                    .catch(function(error) { });

                Produto.delete(produto.id)
                    .then(function(data) { })
                    .catch(function(error) { });

                Produto.select()
                    .then(function(data) { })
                    .catch(function(error) {  });
            
            } catch (error) {

            }
        });
    });
});
```

### Com quem falar? ###

* [Caio Beraldo](https://cberaldodesenvolvimento.wordpress.com/)
* cberaldo.desenvolvimento@outlook.com
* caio.beraldo@fatec.sp.gov.br
