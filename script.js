$(document).ready(function() {

	//what does this do? This creates a function with that converts numbers 11-13 to Jack, Queen and King Strings.  Number Values are still comparable, for example, later when you compare, it will know 11="Jack"
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

	//what does this do? This creates a deck of cards by giving 52 individual Objects with a number, and a suit, and stores it in the "deck" array.
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	deck = _.shuffle(deck); //shuffle the deck
	

	
	var cards_player_1 = [];		//these are your player's decks
	var cards_player_2 = [];

	//divide out the cards into the two arrays

	for (var i = 0; i < deck.length; i++) {  //basic for loop, loops through the length of deck (ask yourself: HOw many times does this loop?)
		if([i] % 2 == 0){					 //if the (array Value)/2 has a remainder of 0 (all even positions in the array)
			cards_player_1.push(deck[i]);	 // place(push) even positioned cards in the deck array to the first player.  (e.g. var arr =[3, 5, 6, 8]), player would receive 3(position 0 of array) and 6(position 2 of array)
		}
		else{								 //for any other condition, in this case, Objects(cards) in the Odd positions of the array
			cards_player_2.push(deck[i]);	 //push to player 2
		}
		
	}

	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	function war(card1, card2) { 				//war function with parameters(is that the right word to use?) card1 and card 2
		if(card1.number > card2.number){		//compare card values, card1.number = object.number.
			return "Player1 Wins";				//checks this in "play" function
		}
		else if(card1.number < card2.number){	//else if to check a second comparator
			return "Player2 Wins";
		}
		else {									//else false was in the instructions
		return false;
		}
	}
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {																			//Play Function
		var round = war(cards_player_1[0], cards_player_2[0]);									//creates a var called "round" that takes the first card(object) from each player's deck
		if (round == "Player1 Wins") {															//if the returned value from the "war" function == var round
			cards_player_1.push(cards_player_1.shift(), cards_player_2.shift());				//shift(places at the bottom of the deck) and place(push) to Player1.  This gives both played cards to the winner
			console.log("Player1 is Boss");	
		}
		else if (round == "Player2 Wins") {
			cards_player_2.push(cards_player_2.shift(), cards_player_1.shift());				//gives both cards to player 2
			console.log("Player2 Wins");
		}	
		else {																					//TIEBREAKER *blackdiamond* - only works for one tiebreaker, so my code won't work if you have multiple tie breakers within each other.
				console.log("War!")  //lets me know its war in the console.
				var tiebreak = war(cards_player_1[3], cards_player_2[3]);						//creates a var called tiebreak that's equal to the 4th card(object) in each player's array
				if (round=="Player1 Wins"){
					for(var i = 0; i < 3; i++)												//to give the winning player all the cards, you need to shift and push each card to the winning player's deck.  This for loop does that.
						cards_player_1.push(cards_player_1.shift(), cards_player_2.shift());	//Does this code look familiar? go to line 71
						alert("Player1 Wins")
				}
				else if ("Player2 Wins") {
					for(var i = 0; i < 3; i++)													//gives all cards to Player 2 by looping through 3 times
						cards_player_2.push(cards_player_2.shift(), cards_player_1.shift());	//Same code as line 75
						alert("Player2 Wins")
				}
				else {
					alert("Go Eff Yourself");													//if another tie break happens within the tie break, say bad things.
					return false;
				}
			return false;
		}
		//this function (defined below) will continue to the next turn
		advance();		//calls the advance function below.
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