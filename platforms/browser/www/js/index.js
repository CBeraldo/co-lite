'use strict';

var venus = angular.module('venus', ['ngCordova', 'ngVenus']);

venus.config(function($locationProvider, $compileProvider) {
    $locationProvider
        .html5Mode(true) // html 5 (base)
        .hashPrefix('*'); // remove o # da url
    $compileProvider
        .aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

// disponibilização do objeto em controllers angularjs.
venus.service("Produto", function($venus, Venus) {
    var produto;

    produto = $venus.implement("Produto", {
        id: {
            type: Venus.INTEGER,
            primaryKey: true
        },
        descricao: {
            type: Venus.STRING,
            allowNulls: false
        },
        valor: {
            type: Venus.DECIMAL,
            allowNulls: false
        }
    });

    // $venus.deviceready(function() {  });

    return produto;
});

venus.controller('teste', function($scope, $venus, Produto) {
    $scope.info = '';
    $scope.lista = [];

    $venus.deviceready(function() {
        $scope.$apply(function() {
            // $scope.info = 'OK';
            // var produto = new Produto();
            // produto.descricao = 'aisod nwqoifniwqo';
            // produto.valor = 19.25;
            // Produto.insert(produto)
            $scope.info = 'as doqnwiqofniwqofn iwqondo';
        });

        $scope.lista = [
            { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '0831' },
            { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '2781' },
            { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '4531' },
            { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '4315' },
            { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '2431' },
            { campo1: 'sand ioqnfionw fioqw', campo2: 's idnqwofinq', campo3: '1311' }
        ];
    });
});