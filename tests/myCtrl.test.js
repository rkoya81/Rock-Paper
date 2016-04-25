describe('Rock, Paper, Scissors App', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var myCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    // The injector unwraps the underscores (_) from around the parameter names when matching
    myCtrl =  $controller('myCtrl', {
      $scope: scope
    });
  }));

  it("should attach a list of gameChoices to the scope", function () {
    expect(scope.gameOptions.length).toBe(3);
  });

  it("should return selectedChoice as 'paper'", function () {
    var option = scope.selectedOption('paper');
    expect(scope.selectedChoice).toBe('paper');
  });

  it("should return selectedChoice as 'rock'", function () {
    var option = scope.selectedOption('rock');
    expect(scope.selectedChoice).toBe('rock');
  });

  it("should return selectedChoice as 'scissors'", function () {
    var option = scope.selectedOption('scissors');
    expect(scope.selectedChoice).toBe('scissors');
  });

  it("should return true as selectedChoice 'rock' is equal to activeMove argument ('rock')", function () {
    scope.selectedChoice = 'rock';
    var option = scope.activeMove('rock');
    expect(option).toBe(true);
  });

  it("should return true as selectedChoice 'scissors' is equal to activeMove argument ('scissors')", function () {
    scope.selectedChoice = 'scissors';
    var option = scope.activeMove('scissors');
    expect(option).toBe(true);
  });

  it("should return true as selectedChoice 'paper' is equal to activeMove argument ('paper')", function () {
    scope.selectedChoice = 'paper';
    var option = scope.activeMove('paper');
    expect(option).toBe(true);
  });

  it("should return false as selectedChoice 'paper' is not equal to activeMove argument ('rock')", function () {
    scope.selectedChoice = 'paper';
    var option = scope.activeMove('rock'); 
    expect(option).toBe(false);
  });

  it("should return false as selectedChoice 'paper' is not equal to activeMove argument ('scissors')", function () {
    scope.selectedChoice = 'paper';
    var option = scope.activeMove('scissors');
    expect(option).toBe(false);
  });

  it("should return false as selectedChoice 'rock' is not equal to activeMove argument ('paper')", function () {
    scope.selectedChoice = 'rock';
    var option = scope.activeMove('paper');
    expect(option).toBe(false);
  });

  it("should return false as selectedChoice 'rock' is not equal to activeMove argument ('scissors')", function () {
    scope.selectedChoice = 'rock';
    var option = scope.activeMove('scissors');
    expect(option).toBe(false);
  });

  it("should return false as selectedChoice 'scissors' is not equal to activeMove argument ('rock')", function () {
    scope.selectedChoice = 'scissors';
    var option = scope.activeMove('rock');
    expect(option).toBe(false);
  });

  it("should return false as selectedChoice 'scissors' is not equal to activeMove argument ('paper')", function () {
    scope.selectedChoice = 'scissors';
    var option = scope.activeMove('paper');
    expect(option).toBe(false);
  });

  it("should return false as selectedChoice is undefined", function () {
    var option = scope.faded('paper');
    expect(option).toBe(false);
  });

  it("should return false as selectedChoice is undefined", function () {
    var option = scope.faded('rock');
    expect(option).toBe(false);
  });

  it("should return false as selectedChoice is undefined", function () {
    var option = scope.faded('scissors');
    expect(option).toBe(false);
  });

  it("should return true as selectedChoice is not equal to faded argument ('scissors')", function () {
    scope.selectedChoice = 'paper';
    var option = scope.faded('scissors');
    expect(option).toBe(true);
  });

  it("should return true as selectedChoice is not equal to faded argument ('rock')", function () {
    scope.selectedChoice = 'paper';
    var option = scope.faded('rock');
    expect(option).toBe(true);
  });

  it("should return true as selectedChoice is not equal to faded argument ('scissors')", function () {
    scope.selectedChoice = 'rock';
    var option = scope.faded('scissors');
    expect(option).toBe(true);
  });

  it("should return true as selectedChoice is not equal to faded argument ('paper')", function () {
    scope.selectedChoice = 'rock';
    var option = scope.faded('paper');
    expect(option).toBe(true);
  });

  it("should return true as selectedChoice is not equal to faded argument ('rock')", function () {
    scope.selectedChoice = 'scissors';
    var option = scope.faded('rock');
    expect(option).toBe(true);
  });

  it("should return true as selectedChoice is not equal to faded argument ('paper')", function () {
    scope.selectedChoice = 'scissors';
    var option = scope.faded('paper');
    expect(option).toBe(true);
  });

  it("should return result as 'draw' when you select paper and 'robot' selects paper", function() {
    var result = RockPaper.getResult('paper', 'paper');
    expect(result.winner).toEqual('draw');
  });

  it("should return result as 'draw' when you select rock and 'robot' selects rock", function() {
    var result = RockPaper.getResult('rock', 'rock');
    expect(result.winner).toEqual('draw');
  });

  it("should return result as 'draw' when you select scissors and 'robot' selects scissors", function() {
    var result = RockPaper.getResult('scissors', 'scissors');
    expect(result.winner).toEqual('draw');
  });

  it("should return result as 'you' when you select rock and 'robot' selects scissors", function() {
    var result = RockPaper.getResult('rock', 'scissors');
    expect(result.winner).toEqual('you');
  });

  it("should return result as 'you' when you select paper and 'robot' selects rock", function() {
    var result = RockPaper.getResult('paper', 'rock');
    expect(result.winner).toEqual('you');
  });

  it("should return result as 'robot' when you select scissors and 'robot' selects rock", function() {
    var result = RockPaper.getResult('scissors', 'rock');
    expect(result.winner).toEqual('robot');
  });

  it("should return result as 'robot' when you select paper and 'robot' selects scissors", function() {
    var result = RockPaper.getResult('paper', 'scissors');
    expect(result.winner).toEqual('robot');
  });

  it("should return result as 'rock'", function() {
    var result = RockPaper.robotChoice(0.33);
    expect(result).toEqual('rock');
  });

  it("should return result as 'paper'", function() {
    var result = RockPaper.robotChoice(0.64);
    expect(result).toEqual('paper');
  });

  it("should return result as 'paper'", function() {
    var result = RockPaper.robotChoice(0.81);
    expect(result).toEqual('scissors');
  });

    it("should return result as 'rock'", function() {
    var result = RockPaper.robotChoice(0.33);
    expect(result).toEqual('rock');
  });

  it("should return result as 'paper'", function() {
    var result = RockPaper.robotChoice(0.64);
    expect(result).toEqual('paper');
  });

  it("should return result as 'It's a draw", function() {
    scope.resultText = RockPaper.information('draw');
    expect(scope.resultText).toEqual('It\'s a draw');
  });

  it("should return result as Robot wins", function() {
    scope.resultText = RockPaper.information('robot');
    expect(scope.resultText).toEqual('Robot wins');
  });

  it("should return result as You win", function() {
    scope.resultText = RockPaper.information('you');
    expect(scope.resultText).toEqual('You win');
  });

  it("should return result of draw as 1", function() {
    var option = scope.incrementScores('draw');
    expect(scope.scores.draws).toEqual(1);
  });

  it("should return result of yourWins as 1", function() {
    var option = scope.incrementScores('you');
    expect(scope.scores.yourWins).toEqual(1);
  });

  it("should return result of robotWins as 1", function() {
    var option = scope.incrementScores('robot');
    expect(scope.scores.robotWins).toEqual(1);
  });
});