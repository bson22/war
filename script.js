$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	deck = _.shuffle(deck); //shuffle the deck
	

	
	var cards_player_1 = [];
	var cards_player_2 = [];

	//divide out the cards into the two arrays

	for (var i = 0; i < deck.length; i++) {
		if([i] % 2 == 0){
			cards_player_1.push(deck[i]);
		}
		else{
			cards_player_2.push(deck[i]);
		}
		
	}

	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	function war(card1, card2) {
		if(card1.number > card2.number){
			return "Player1 Wins";
		}
		else if(card1.number < card2.number){
			return "Player2 Wins";
		}
		else {
		return false;
		}
	}
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {
		var round = war(cards_player_1[0], cards_player_2[0]);
		if (round == "Player1 Wins") {
			cards_player_1.push(cards_player_1.shift(), cards_player_2.shift());
			console.log("Player1 is Boss");
		}
		else if (round == "Player2 Wins") {
			cards_player_2.push(cards_player_2.shift(), cards_player_1.shift());
			console.log("Player2 Wins");
		}
		else {
				console.log("War!")
				var tiebreak = war(cards_player_1[3], cards_player_2[3]);
				if (round=="Player1 Wins"){
					for(var i = 0; i < 3; i++)
						cards_player_1.push(cards_player_1.shift(), cards_player_2.shift());
						alert("Player1 Wins")
				}
				else if ("Player2 Wins") {
					for(var i = 0; i < 3; i++)
						cards_player_2.push(cards_player_2.shift(), cards_player_1.shift());
						alert("Player2 Wins")
				}
				else {
					alert("Go Eff Yourself");
					return false;
				}
			return false;
		}
		//this function (defined below) will continue to the next turn
		advance();
	}
	
	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	
	$(".btn").click(function() {
		play();
	});
});