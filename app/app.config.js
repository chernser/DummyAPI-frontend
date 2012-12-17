define([

], function () {

  var backends = [
    { // This may already be localhost
      title:window.location.hostname,
      server:window.location.hostname + ':8000',
      root:"/"
    },
    {
      title:"api.f9test.com",
      server:"api.f9test.com:8000",
      root:"/"
    }
  ];

  var config = {
    backends:backends,
    backend:backends[0]
  };

  return config;
});
