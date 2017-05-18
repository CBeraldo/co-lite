'use strict';

var colite = angular.module('colite', ['ngCordova', 'ngDeviceReady', 'Colite']);

colite.config(function($locationProvider, $compileProvider) {
    $locationProvider
        .html5Mode(true) // html 5 (base)
        .hashPrefix('*'); // remove o # da url
    $compileProvider
        .aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

// disponibilização do objeto em controllers angularjs.
colite.service("Produto", function($colite, Colite) {
    var produto;

    produto = $colite.implement("Produto", {
        id: {
            type: Colite.INTEGER,
            primaryKey: true
        },
        descricao: {
            type: Colite.STRING
        },
        valor: {
            type: Colite.DECIMAL
        }
    }, true);

    return produto;
});

colite.controller('main.controller', function() {});

colite.controller('teste', function($scope, $colite, $deviceready, Produto) {
    $scope.info = 'sa dwqdwq dqw';
    $scope.lista = [];

    // $deviceready(function() {
    //     alert('deviceready');
    //     var produto = new Produto();
    //     // produto.id = 2;
    //     produto.descricao = 'PRODUTO 002';
    //     produto.valor = 80.0;

    //     Produto.insert(produto)
    //         .then(function() {
    //             $scope.info = 'inserted';
    //         })
    //         .catch(function(error) {
    //             $scope.info = error.message;
    //         });

    //     // Produto.update(produto).then(function() {}).catch(function(error) { $scope.info = error.message; });
    //     // Produto.delete(produto.id).then(function() { $scope.info = 'DELETED!'; }).catch(function(error) { $scope.info = error.message; });

    //     // Produto.create();
    //     // Produto.drop();

    //     Produto
    //         .select()
    //         .then(function(data) {
    //             var rows = [];
    //             for (var i = 0; i < data.rows.length; i++) {
    //                 rows.push(data.rows.item(i));
    //             }

    //             $scope.lista = rows;
    //         })
    //         .catch(function(error) {
    //             $scope.info = error.message;
    //         });
    // });
});