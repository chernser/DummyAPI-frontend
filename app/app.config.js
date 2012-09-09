define([

], function () {

  var alt_backends = [
    {
      title:"api.f9test.com",
      server:"api.f9test.com:8000"
    }
  ];

  var default_backend = {
    title:window.location.hostname,
    server: window.location.hostname + ':8000'
  };

  var backends = [default_backend].concat(alt_backends);

  var config = {
    backends:backends,
    backend:backends[0]
  };

  return config;
});