define([

], function () {

  var backends = [
    {
      title:"localhost",
      server:window.location.hostname + ":8000"
    },

    {
      title:"api.f9test.com",
      server:"api.f9test.com:8000"
    }
  ];


  var config = {
    backends: backends,
    backend:backends[0]
  };

  return config;
});