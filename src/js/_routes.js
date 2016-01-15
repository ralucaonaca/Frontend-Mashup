/**
 * Created by raluca on 09.12.2015.
 */

var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('person-list', {
            url: "/person-list",
            templateUrl: "partials/person_list.html",
            controller: 'PersonController'
        })
        .state('create-person', {
            url: "/create-person",
            templateUrl: "partials/edit_person.html",
            controller: 'editPersonController'
        })
        .state('edit-person', {
            url: "/edit-person/:personId",
            templateUrl: "partials/edit_person.html",
            controller: 'editPersonController'
        })
        .state('delete-person', {
            url: "/delete-person/:personId",
            controller: 'deletePersonController'
        })
});