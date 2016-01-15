/**
 * Created by raluca on 09.12.2015.
 */
var myApp = angular.module('myApp');
myApp.factory('PersonService', function($http, $q, $rootScope) {
    return {
        getPersons: function() {
            return $http({
                url: 'http://localapi.com/person/getAll',
                method: 'GET',
            })
            .then(function(result) {
                return result.data;
            });
        },

        deletePerson: function(personId) {
            return $http({
                url: 'http://localapi.com/person/delete/',
                method: "DELETE",
                params: { id : personId }
            })
            .then(function(result) {
                return result.data;
            });
        },

        getPerson: function(personId) {
            return $http({
                headers: {
                    'Content-Type': "application/json"
                },
                url: 'http://localapi.com/person/get',
                method: 'GET',
                data: {"id" : personId}
            })
            .then(function(result) {
                return result.data;
            });
        },

        savePerson: function(person) {
            var personId = person.id;
            delete person.id;

            return $http({
                url: 'http://localapi.com/person/update',
                params: angular.toJson(company)
            })
            .then(function(result) {
                return result.data;
            });
        },

        createPerson: function(person) {
            return $http({
                headers: {
                    'Content-Type': "application/json"
                },
                url: 'http://localapi.com/person/add',
                method: 'POST',
                data: angular.toJson(person)
            })
            .then(function(result) {
                return result.data;
            });
        },
    }
});
