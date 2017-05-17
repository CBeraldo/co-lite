'use strict';

var colite = angular.module('colite', ['ngCordova', 'Colite']);

colite.config(function($locationProvider, $compileProvider) {
    $locationProvider
        .html5Mode(true) // html 5 (base)
        .hashPrefix('*'); // remove o # da url
    $compileProvider
        .aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

// disponibilização do objeto em controllers angularjs.
colite.service("Produto", function($colite, Colite) {
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

colite.controller('main.controller', function($scope, $colite, Produto) {

});

colite.controller('teste', function($scope, $colite, Produto) {
    $scope.info = '';
    $scope.lista = [];

    $colite.deviceready(function() {
        $scope.$apply(function() {
            try {
                // var produto = new Produto();
                // produto.id = 2;
                // produto.descricao = 'PRODUTO 002';
                // produto.valor = 80.0;

                // Produto.insert(produto).then(function() {}).catch(function(error) { $scope.info = error.message; });
                // Produto.update(produto).then(function() {}).catch(function(error) { $scope.info = error.message; });
                // Produto.delete(produto.id).then(function() { $scope.info = 'DELETED!'; }).catch(function(error) { $scope.info = error.message; });
            } catch (error) {
                // $scope.info = error.message;
            }
        });

        $scope.$apply(function() {
            Produto
                .select()
                .then(function(data) {
                    var rows = [];
                    for (var i = 0; i < data.rows.length; i++) {
                        rows.push(data.rows.item(i));
                    }

                    $scope.lista = rows;
                })
                .catch(function(error) {
                    $scope.info = error.message;
                });
        });
        // .then(function(data) {
        //     // LxNotificationService.success(res.rows.item(i));
        //     $scope.info = data;
        // });

        // $scope.lista = [
        //     { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '0831' },
        //     { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '2781' },
        //     { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '4531' },
        //     { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '4315' },
        //     { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '2431' },
        //     { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '1311' }
        // ];
    });
});