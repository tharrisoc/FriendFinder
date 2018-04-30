var database = require('../data/friends.js');

module.exports = function(app) {

// Routes
// =============================================================

  // return a JSON array to the browser, which contains one object
  // for each of the existing members
  app.get("/api/friends", function(req, res) {
    console.log("GET /api/friends");
    return res.json(database.members);  
  });

  // accept a survey and create a new member
  app.post("/api/friends", function(req, res) {
   console.log("POST to /api/friends");
   var newMember = req.body;
   addNewMember(newMember, res);
  });
}

// process the survey, match the new member against the existing
// members, and add the new member to the (in-memory) database
function addNewMember(newMember, res) {
  // retrieve the values that were entered on the Survey form
  var name = newMember.firstname;
  var gender = (newMember.gender === 'gendermale') ? 'male' : 'female';
  var photourl = newMember.photourl;
  var responsesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var regexp = /^radioq\d{2}r\d$/;
  var q, r;

  // The answers to the survey questions are saved here
  for( var property in newMember ) {
    if ( regexp.test(newMember[property]) ) {
      q = Number(newMember[property].substring(6, 8));
      r = Number(newMember[property].substring(9));
      responsesArray[q-1] = r;
    }
  }

  // instantiate an object for the new member
  var newObject =
  {
     name   : name,
     gender : gender,
     photo  : photourl,
     scores : responsesArray
  };

  // Match the new member against the others in the database BEFORE adding
  // him/her to the database, in order to prevent that member from being
  // matched against him or herself
  var bestMatch = findBestMatch(newObject);
  console.log("The best match is: " + bestMatch + "  "
            + database.members[bestMatch].name);

  database.members.push(newObject);

  res.writeHead(200, { "Content-Type" : "text/html" });
  res.end(tempMatchPage(database.members[bestMatch].name));
}

// use the answers to the survey questions to determine the best
// match for a new member
function findBestMatch(newMember) {
  var myScores = newMember.scores;
  var myGender = newMember.gender;
  var numMembers = database.members.length;
  var minTotDiff = 500;
  var minSubs = -1;
  var subs = 0;
  var member;

  for ( var j = 0; j < numMembers; j++) {
    member = database.members[j];    
    if (myGender !== member.gender) {
      otherScores = member.scores;
      var totDiff = 0;
      var thisDiff;

      // console.log(myScores);
      //console.log(otherScores)

      for (var i = 0; i < 10; i++) {
        thisDiff = Math.abs(myScores[i] - otherScores[i]);
        totDiff += thisDiff;
        // console.log('mys[' + i + ']=' + myScores[i] + ' ots[' + i + ']=' + otherScores[i] + ' thisDiff=' + thisDiff + ' totDiff=' + totDiff);
      }

      if (totDiff < minTotDiff) {
        minSubs = j;
        minTotDiff = totDiff;
        //console.log('minSubs=' + minSubs + ' minTotDiff=' + minTotDiff);
      }
    }
  }

  console.log('Final ' + minSubs + ' ' + minTotDiff);
  return minSubs;
}

// This temporary page provides a response to a new member that includes
// the name of the best match, but not the photo of that match
// TODO: implement code to solve the missing photos problem

function tempMatchPage(memberName) {
  var pageText = 
"<!DOCTYPE html \
<html> \
  <head> \
    <style> \
      .center { \
        text-align : center; \
      } \
      #container { \
        display : block; margin-left : auto; margin-right : auto; \
      } \
      #imgplaceholder { \
        height : 100px; \
        width : 120px; \
        border-color : red; \
        border-style : double; \
        border-width : 4px; \
        background-color : #cff9f9; \
        display : block; \
        margin-left : auto; \
        margin-right : auto; \
      } \
    </style> \
  </head> \
  <body> \
    <div id='container'> \
      <h4 class='center'>Based on the answers that you provided in our survey</h4> \
      <h4 class='center'>Your best match is:</h4> \
      <p class='center'><span>Timothy</span></p> \
      <div id='imgplaceholder' class='center'> \
        <p class='center'>Sorry, photo display not implemented yet</p> \
      </div>  \
  </body> \
</html>  \
";

  var returnText = pageText;
  returnText = returnText.replace("Timothy", memberName);
  return(returnText);
}

/*
This log snippet illustrates that the matching algorithm is
working as intended.

Thomass-MacBook-Pro:FriendFinder thomaswharris$ node server.js
App listening on PORT 3000
GET /api/friends
POST to /api/friends
[ 5, 3, 5, 4, 2, 4, 3, 5, 5, 4 ]
[ 5, 1, 4, 4, 5, 1, 2, 5, 4, 1 ]
mys[0]=5 ots[0]=5 thisDiff=0 totDiff=0
mys[1]=3 ots[1]=1 thisDiff=2 totDiff=2
mys[2]=5 ots[2]=4 thisDiff=1 totDiff=3
mys[3]=4 ots[3]=4 thisDiff=0 totDiff=3
mys[4]=2 ots[4]=5 thisDiff=3 totDiff=6
mys[5]=4 ots[5]=1 thisDiff=3 totDiff=9
mys[6]=3 ots[6]=2 thisDiff=1 totDiff=10
mys[7]=5 ots[7]=5 thisDiff=0 totDiff=10
mys[8]=5 ots[8]=4 thisDiff=1 totDiff=11
mys[9]=4 ots[9]=1 thisDiff=3 totDiff=14
minSubs=0 minTotDiff=14
[ 5, 3, 5, 4, 2, 4, 3, 5, 5, 4 ]
[ 3, 5, 1, 3, 2, 5, 1, 2, 4, 1 ]
mys[0]=5 ots[0]=3 thisDiff=2 totDiff=2
mys[1]=3 ots[1]=5 thisDiff=2 totDiff=4
mys[2]=5 ots[2]=1 thisDiff=4 totDiff=8
mys[3]=4 ots[3]=3 thisDiff=1 totDiff=9
mys[4]=2 ots[4]=2 thisDiff=0 totDiff=9
mys[5]=4 ots[5]=5 thisDiff=1 totDiff=10
mys[6]=3 ots[6]=1 thisDiff=2 totDiff=12
mys[7]=5 ots[7]=2 thisDiff=3 totDiff=15
mys[8]=5 ots[8]=4 thisDiff=1 totDiff=16
mys[9]=4 ots[9]=1 thisDiff=3 totDiff=19
[ 5, 3, 5, 4, 2, 4, 3, 5, 5, 4 ]
[ 5, 3, 4, 4, 5, 4, 3, 2, 4, 4 ]
mys[0]=5 ots[0]=5 thisDiff=0 totDiff=0
mys[1]=3 ots[1]=3 thisDiff=0 totDiff=0
mys[2]=5 ots[2]=4 thisDiff=1 totDiff=1
mys[3]=4 ots[3]=4 thisDiff=0 totDiff=1
mys[4]=2 ots[4]=5 thisDiff=3 totDiff=4
mys[5]=4 ots[5]=4 thisDiff=0 totDiff=4
mys[6]=3 ots[6]=3 thisDiff=0 totDiff=4
mys[7]=5 ots[7]=2 thisDiff=3 totDiff=7
mys[8]=5 ots[8]=4 thisDiff=1 totDiff=8
mys[9]=4 ots[9]=4 thisDiff=0 totDiff=8
minSubs=4 minTotDiff=8
[ 5, 3, 5, 4, 2, 4, 3, 5, 5, 4 ]
[ 3, 2, 5, 2, 4, 4, 4, 4, 3, 3 ]
mys[0]=5 ots[0]=3 thisDiff=2 totDiff=2
mys[1]=3 ots[1]=2 thisDiff=1 totDiff=3
mys[2]=5 ots[2]=5 thisDiff=0 totDiff=3
mys[3]=4 ots[3]=2 thisDiff=2 totDiff=5
mys[4]=2 ots[4]=4 thisDiff=2 totDiff=7
mys[5]=4 ots[5]=4 thisDiff=0 totDiff=7
mys[6]=3 ots[6]=4 thisDiff=1 totDiff=8
mys[7]=5 ots[7]=4 thisDiff=1 totDiff=9
mys[8]=5 ots[8]=3 thisDiff=2 totDiff=11
mys[9]=4 ots[9]=3 thisDiff=1 totDiff=12
Final 4 8
The best match is: 4  Michael

 */