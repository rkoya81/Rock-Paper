var RockPaper = RockPaper || {};
var myApp = angular.module('myApp', ['ngRoute'])

/* 
 Route for game
*/
.config(['$routeProvider',function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'pages/game.html',
      controller  : 'myCtrl'
  })
}])

/*
  Controller for application
*/
myApp.controller('myCtrl',['$scope','$timeout', function($scope, $timeout) {
  /* 
    Score object to track the total 
  */
  $scope.scores = {
    yourWins: 0,
    draws: 0,
    robotWins: 0
  };

  $scope.disabledClick = false;
  $scope.list = [];

  /*
    Game options 
  */
  $scope.gameOptions = ['rock', 'paper', 'scissors'];
  
  /* 
    Set selected option for user choice, robot choice and get the winner
  */
  $scope.selectedOption = function(choice) {
    if(!$scope.disabledClick) {

      var randomValue = parseFloat(Math.random()).toFixed(2);
      var info = RockPaper.information();

      $scope.disabledClick = true;
      $scope.selectedChoice = choice;
      $scope.robotValue = RockPaper.robotChoice(randomValue);
      $scope.results = RockPaper.getResult(choice, $scope.robotValue);
      $scope.resultText = RockPaper.information($scope.results.winner);
      $scope.incrementScores($scope.results.winner);
      $scope.list.push($scope.results.winnerInfo);
      /* 
        Reset values after 2 seconds 
      */
      $timeout(function() {
        $scope.disabledClick = false;
        $scope.resultText = '';
        $scope.selectedChoice = '';
        $scope.robotValue = '';
       }, 2000);
    }
  }

  $scope.incrementScores = function(results) {
    switch(results) {
      case 'draw':
        $scope.scores.draws++;
      break;
      case 'robot':
        $scope.scores.robotWins++;
      break;
      case 'you':
        $scope.scores.yourWins++;
      break;
      default: 
      break;
    }
  }

  $scope.activeMove = function(choice) {
    return $scope.selectedChoice === choice;
  }

  $scope.faded = function(choice) {
    if(typeof $scope.selectedChoice !== 'undefined' && $scope.selectedChoice !== '') {
      return $scope.selectedChoice !== choice;
    } else {
      return false;
    }
  }
}]);

RockPaper.information = function(result) {
   var infoObject = {
    'draw': 'It\'s a draw',
    'robot': 'Robot wins',
    'you': 'You win'
   }

   return infoObject[result];
}

/* 
  Return the robot value, seperated into third's
*/
RockPaper.robotChoice = function(randomValue) {
  return (randomValue <= 0.33) ? 'rock' : (0.34 <= randomValue && randomValue <= 0.66) ? 'paper' : 'scissors';
};

/* 
  Returns the result based on user choice and robot choice
*/
RockPaper.getResult = function(yourChoice, robotChoice) {
  var winner = '';

  var winnerInfo = '';

  if(yourChoice === robotChoice) {
    return {
      winner: 'draw',
      winnerInfo: 'It\'s a draw'
    }
  }

  switch(yourChoice) {
    case 'rock':
      winner = (robotChoice === 'paper') ? 'robot' :  'you';
    break;
    case 'paper':
      winner = (robotChoice === 'scissors') ? 'robot' :  'you';
    break;
    case 'scissors':
      winner = (robotChoice === 'rock') ? 'robot' :  'you';
    break;
    default: 
    break;
  }

  switch(winner) {
    case 'you':
      winnerInfo = 'You - ' + yourChoice + ' beats ' + robotChoice;
    break;
    case 'robot':
      winnerInfo = 'Robot - ' + robotChoice + ' beats ' + yourChoice
    break;
    default: 
    break;
  }

  return {
    winner: winner,
    winnerInfo: winnerInfo
  }
}