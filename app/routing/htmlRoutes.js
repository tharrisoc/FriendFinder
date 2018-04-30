
module.exports = function(app) {

  // Routes
  // =============================================================
  
  // Display the survey page
  app.get("/survey", function(req, res) {
    res.sendFile( saveRoot + "/app/public/survey.html");
  });

  // Default catch-all route
  app.get("/", function(req, res) {
    res.sendFile( saveRoot + "/app/public/home.html");
  });
}
