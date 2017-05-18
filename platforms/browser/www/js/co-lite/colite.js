(function() {
    'use strict'

    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined' ?
                    args[number] :
                    match;
            });
        };
    }
    if (!String.prototype.repeat) {
        String.prototype.repeat = function(length) {
            var str = '';
            var repeat = this;

            for (var i = 0; i < length; i++) {
                str = str + repeat;
            }

            return str;
        };
    }

    var colite = angular
        .module('Colite', ['ngCordova'])
        // serviços 
        .service('$colite', Colite)
        // constantes 
        .constant('Colite', {
            STRING: "STRING",
            INTEGER: "INTEGER",
            DATE: "DATE",
            DATETIME: "DATETIME",
            BIGINT: "BIGINT",
            DECIMAL: "NUMERIC",
            TEXT: "TEXT"
        });

    Colite.$inject = ['$cordovaSQLite'];

    function Colite($cordovaSQLite) {
        var vm = this;

        vm.isDeviceReady = false;

        vm.connect = function() {
            var config = { name: 'database.db', location: 'default', bgType: 1 };
            return $cordovaSQLite.openDB(config);
        }

        vm.execute = function(query, values) {
            return $cordovaSQLite.execute(vm.connect(), query, values);
        }

        vm.deviceready = function(callback) {
            // caso dispositivo já esteja pronto não adiciona EventListener, apenas executa.
            if (vm.isDeviceReady) {
                callback();
            } else {
                document.addEventListener('deviceready', function() {
                    callback();
                }, false);
            }
        }

        vm.orm = {
            drop: function() {
                var query = ['DROP TABLE IF EXISTS', this.displayName].join('  ');
                return vm.execute(query);
            },
            create: function() {
                var model = this;
                var create = [];

                Object.keys(model.prototype).forEach(function(key, value) {
                    var prop = '';
                    var propObj = model.base[key];

                    prop = [prop, key, propObj.type].join(' ');

                    if (propObj.allowNulls)
                        prop = [prop, 'NULL'].join(' ');
                    else
                        prop = [prop, 'NOT NULL'].join(' ');

                    if (propObj.primaryKey)
                        prop = [prop, 'PRIMARY KEY AUTOINCREMENT'].join(' ');
                    else
                    if (propObj.uniqueKey)
                        prop = [prop, 'UNIQUE'].join(' ');

                    create.push(prop);
                });

                var query = ['CREATE TABLE IF NOT EXISTS', this.displayName, '(', create.join(', '), ')'].join('  ');
                return vm.execute(query);
            },
            insert: function(object) {
                var model = this;
                var insert = [];
                var values = [];

                Object.keys(model.prototype).forEach(function(key, value) {
                    if (key != 'id') {
                        insert.push(key); // prop
                        values.push(object[key]); // value
                    }
                });

                var query = ' insert into {0} ( {1} ) values ( ? {2} ) '.format(
                    model.displayName,
                    insert.join(', '),
                    ', ?'.repeat(values.length - 1));

                return vm.execute(query, values);
            },
            update: function(object) {
                var model = this;
                var update = [];
                var values = [];

                Object.keys(model.prototype).forEach(function(key, value) {
                    if (key != 'id') {
                        update.push(key + ' = ?'); // prop
                        values.push(object[key]); // value
                    }
                });

                values.push(object.id);
                var query = ' update {0} set {1} where id = ? '.format(model.displayName, update.join(', '));
                return vm.execute(query, values);
            },
            delete: function(id) {
                var model = this;
                var query = ' delete from {0} where id = ? '.format(model.displayName);
                return vm.execute(query, [id]);
            },
            select: function(id) {
                var query = ' select * from {0} '.format([this.displayName]);

                if (id) {
                    query = query + ' where id = ? ';
                    return vm.execute(query, [id]);
                } else {
                    return vm.execute(query);
                }
            }
        };

        vm.implement = function(name, base, force) {
            // implementação do modelo em um objeto.
            function model() {}
            Object.keys(base).forEach(function(prop) {
                model.prototype[prop] = null;
            });
            model.prototype.id = null;

            model.displayName = name;
            model.base = base;

            model.drop = vm.orm.drop;
            model.create = vm.orm.create;
            model.insert = vm.orm.insert;
            model.update = vm.orm.update;
            model.delete = vm.orm.delete;
            model.select = vm.orm.select;

            vm.deviceready(function() {
                if (force)
                    model.drop();
                model.create();
            });

            return model;
        };

        return {
            deviceready: vm.deviceready,
            implement: vm.implement
        }
    }

}());