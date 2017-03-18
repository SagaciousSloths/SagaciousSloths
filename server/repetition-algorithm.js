exports.updateParameters = function (user, deck) {
	// TODO: use the user and deck params

};

--- Display of deck page
React:
 GET /dashboard    (with session ID)

Server:
  Algorithm:
    query Familiarities for scores on all cards for a given user:
      -> cardScores = {cardId: score, ...}, for the given user 

    query Google for all (card id & deck name)
    result = [{deckname: deckname, 
              redscore: red score,
              orange score: orange score,
              green score: green score}, ...]

    result = {deckname: {red: score, orange: score, green: score}, ...}

    for each line of the Google table returned
      increment the right red/orange/red value for result[deckname]
        based up cardScores[cardId]



 ->   query Google for all (card id & deck name)
        query Familiarities for that card id and user -> score
          add that score to the total for (deck name, Red/Orange/Green)


  return: set of (deck name + red,orange,green counts for logged in user),
    for each deck



--- Request for a specific deck quiz
React:
 GET /deck/deckId
 
Server:
  get the deck cards from red to green:
    query Familiarities for red first, then orange cards for user 
      into array of cardIds
    request [first name, last name, pic link] corresponding to
      these cardIds in order, from Google

  return: [[first name, last name, picture link], ...] 
    in order of decreasing importance (=priority) for quiz



--- After each card of quiz
React:
 POST /api/card with data: card Id + result (red/orange/green)

Server: 
 returns OK
 recomputes the algo value for user + card:

Algorithm:
 previous score = find(cardId, userId)
 new score = compute (previous score, current card quiz score)
 replace (cardId, userId, new score)






---- End of quiz
React:
 POST /api/parameters   with data: userId (staff id) + deck Id

Server:
 returns updated red, orange and green totals for that deckId + userId


