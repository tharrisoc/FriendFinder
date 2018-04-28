
module.exports = function(app) {

// Routes
// =============================================================

  app.get("/api/friends", function(req, res) {
    
  });
    
  app.post("/api/friends", function(req, res) {
   console.log("POST to /api/friends");
   var newMember = req.body;
   console.log(newMember);
  });
}
  