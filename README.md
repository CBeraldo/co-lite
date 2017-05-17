# CO-LITE #

### Sobre o repositório ###

* ORM SQLite simples para cordova utilizando AngularJS.

### Por onde começar? ###

* npm init
* npm install -g bower
* bower install --save angular
* bower install --save ngCordova
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

* Vínculo do controlador com o HTML.

```
<html ng-app="mymodule">
    <body>
        <div ng-controller="teste">
        </div>

        <!-- dependências -->
        <script type="text/javascript" src="angular.min.js"></script>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="ng-cordova.min.js"></script>

        <!-- co-lite -->
        <script type="text/javascript" src="colite.min.js"></script>

        <!-- scripts customizados -->
    </body>
</html>
```

### Com quem falar? ###

* [Caio Beraldo](https://cberaldodesenvolvimento.wordpress.com/)
* cberaldo.desenvolvimento@outlook.com
* caio.beraldo@fatec.sp.gov.br
* [GitHub](https://github.com/CBeraldo/co-lite)

### Versões ###

* 1.0.5:
    - Atualização da documentação.
* 1.0.4:
    - Atualização da documentação.
    - Atualização da licença de uso.
* 1.0.3:
    - Atualização da documentação.
* 1.0.2:
    - Disponibilização da documentação.
* 1.0.1:
    - Otimização do diretório de arquivos.
* 1.0.0:
    - Funcionalidades básicas: insert, update, delete, select, create (table) e implementação de objetos.

### Licença ###

Copyright 2017 CBeraldo

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.