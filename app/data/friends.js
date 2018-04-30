/*
 *  In-memory storage of the friend candidate database, backed by
 *  this file being dynamically updated
 * 
 *  TODO: saving this array to disk has NOT been implemented yet.
 *        Right now, this array simply provides a starter set of
 *        members. Any members that are added during a single session
 *        will be remembered and used for matching, but they will not
 *        be saved to disk.
 * 
 *  This is the structure that represents an individual candidate.
 *  The database consists of an array of these objects
 * 
 *  {
 *     "name"   : "Ahmed",
 *     "gender" : "male",
 *     "photo"  : "https://www.pexels.com/photo/man-in-grey-crew-neck-shirt-819482/",
 *     "scores" : [ 5, 1, 4, 4, 5, 1, 2, 5,4, 1 ]
 *  }
 * 
 */

 /* **************************** START DATA HERE ******************* */
var candidates = [
  {
    "name"   : "James",
    "gender" : "male",
    "photo"  : "http://fakepictures.com/fakepicture01.jpg",
    "scores" : [ 5, 1, 4, 4, 5, 1, 2, 5,4, 1 ]
  },
  { "name"   : 'Dan',
    "gender" : 'male',
    "photo"  : 'http://fakepictures.com/fakepicture02.jpg/',
    "scores" : [ 3, 5, 1, 3, 2, 5, 1, 2, 4, 1 ]
  },
  { "name"   : "Susan",
    "gender" : "female",
    "photo"  : "http://fakepictures.com/fakepicture03.jpg",
    "scores" : [ 5, 1, 4, 4, 2, 4, 4, 5, 4, 4 ]
  },
  { "name"   : "Jane",
    "gender" : "female",
    "photo"  : "http://fakepictures.com/fakepicture04.jpg",
    "scores" : [ 4, 1, 3, 5, 1, 3, 2, 0, 3, 4 ] 
  },
  { "name"   : "Michael",
    "gender" : "male",
    "photo"  : "http://fakepictures.com/fakepicture05.jpg/",
    "scores" : [ 5, 3, 4, 4, 5, 4, 3, 2, 4, 4 ]
  },
  { "name"   : "Veronica",
    "gender" : "female",
    "photo"  : "http://fakepictures.com/fakepicture06.jpg/",
    "scores" : [ 1, 2, 3, 5, 3, 2, 2, 4, 3, 5 ]
  },
  { "name"   : "Charles",
    "gender" : "male",
    "photo"  : "http://fakepictures.com/fakepicture07.jpg",
    "scores" : [ 3 ,2 ,5 ,2 , 4, 4, 4, 4, 3, 3 ]
  },
  { "name"   : "Beth",
    "gender" : "female",
    "photo"  : "http://fakepictures.com/fakepicture08.jpg/",
    "scores" : [ 5, 3, 5, 4, 2, 4, 3, 5, 5, 4 ]
  },
  { "name"   : "Mary",
    "gender" : "female",
    "photo"  : "http://fakepictures.com/fakepicture09.jpg",
    "scores" : [ 1, 1, 2, 3, 3, 1, 1, 4, 2, 3 ]
  }
];
/* **************************** END OF DATA ************************ */
 
 module.exports = {
  members : candidates
 };
