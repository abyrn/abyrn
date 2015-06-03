angular.module('app', ["firebase"]);

angular.module('app').controller('InitCtrl', function ($scope, $firebaseArray, $firebaseObject) {

		
	var ref = new Firebase("https://encountermanager.firebaseio.com/Players");

	$scope.Characters = $firebaseArray(ref);

	var mons = new Firebase("https://encountermanager.firebaseio.com/Monsters");

	$scope.Current = {};

	$scope.Monsters = $firebaseObject(mons);		

	$scope.addCharacters = function(character) {
		var copyCharacter = {};
		angular.copy(character, copyCharacter);
		var hp = 0;
		var hd = copyCharacter.hd.size.split(/[d, ]/)
		for(i = 0; i < hd[0]; i++){
			hp = hp + Math.floor(Math.random() * hd[1]) + 1
		};
		if (hd[3]) {
			hp = eval(hp + hd[2] + hd[3]);
		};
		copyCharacter.hp = {};
		copyCharacter.hp.max = hp; 
		copyCharacter.hp.current = hp;
		copyCharacter.acSel = character.ac[0];
		$scope.Characters.$add(copyCharacter);
	};

	$scope.CurrentCharacter = function(character) {
		var cur = $firebaseObject(ref.child(character.$id));
		$scope.Current = cur;		
	};

	var spell = new Firebase("https://encountermanager.firebaseio.com/Spells");

	$scope.Spells = $firebaseObject(spell);

});

angular.module('app').filter('scores', function() {
	return function(input) {
		var out = 0;
		if (input >= 10) {
			out = Math.floor((input - 10)/2)
		} else {
			out = Math.floor((input - 10)/2)
		}
		return out;	
	};
});
