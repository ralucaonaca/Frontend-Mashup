/**
 * Created by raluca on 09.12.2015.
 */
var myApp = angular.module('myApp');

myApp.controller('PersonController', function ($scope, PersonService) {
    PersonService.getPersons().then(function(users){
        $scope.persons = users.message;
    });
});

myApp.controller('deletePersonController', function ($scope, $stateParams, PersonService, $location, $log) {

    PersonService.deletePerson($stateParams.personId).then(function(data){
        if (!data) {
            $location.path("person-list");
        } else {
            $log.error("error handler message");
        }

    });
});

myApp.controller('editPersonController', function ($scope, $stateParams, PersonService, $location) {

    if (!$stateParams.personId){
        $scope.newPerson = false;
        $scope.person = {
            firstName : '',
            lastName : ''
        };
    } else {
        $scope.newPerson = true;;
        PersonService.getPerson($stateParams.personId).then(function (person) {
            $scope.person = person;
        });
    }

    $scope.update = function(person){
        if (person.id) {
            var personId = person.id;
            PersonService.savePerson(person).then(function(data){
                if (data.errors){
                    $scope.errors = data.errors;
                    $scope.company.id = companyId;
                } else {
                    $location.path("person-list");
                }
            })
        } else {
            PersonService.createPerson(person).then(function(data){
                if (data.errors)
                    $scope.errors = data.message;
                else   {
                    $location.path("person-list");
                }
            })
        }

    }
});