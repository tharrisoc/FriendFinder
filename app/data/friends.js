/*
 *  In-memory storage of the friend candidate database, backed by
 *  this file being dynamically updated
 * 
 *  This is the structure that represents an individual candidate.
 *  The database consists of an array of these objects
 * 
 *  {
 *     "name"   : "Ahmed",
 *     "gender" : "male",
 *     "photo"  : "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
 *     "scores" : [ 5, 1, 4, 4, 5, 1, 2, 5,4, 1 ]
 *  }
 * 
 */

 /* **************************** START DATA HERE ******************* */
var candidates = [
  {
    "name"   : "Ahmed",
    "gender" : "male",
    "photo"  : "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores" : [ 5, 1, 4, 4, 5, 1, 2, 5,4, 1 ]
  }
];
/* **************************** END OF DATA ************************ */
 
 module.exports = {
  members : candidates
 };
