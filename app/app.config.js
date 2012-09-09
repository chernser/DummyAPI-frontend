define([
  "underscore"
], function (_) {


  var alt_backends = {
    'localhost':'localhost:8000'
  };


  var cur_hostname = window.location.hostname;
  var backends = {};

  backends[cur_hostname] = _.isUndefined(alt_backends[cur_hostname]) ? cur_hostname + ':8000' : alt_backends[cur_hostname];

  for (var backend_title in alt_backends) {
    if (backend_title == cur_hostname) {
      continue;
    }

    backends[backend_title] = alt_backends[backend_title];
  }

  var config = {
    backends:backends,
    backend:backends[window.location.hostname]
  };

  return config;
});