$(function() {
  // Initialise the Zendesk JavaScript API client
  // https://developer.zendesk.com/apps/docs/apps-v2
  var client = ZAFClient.init();
  client.invoke('hide');
  client.on('ticket.custom_field_22713894.changed', function() {
    var valuePromise = client.get('ticket.customField:custom_field_22713894');
    valuePromise.then(function(results) {
      if (results['ticket.customField:custom_field_22713894'] === 'injury_death_likely') {
        client.invoke('instances.create', {
          location: 'modal',
          url: 'assets/modal.html'
        }).then(function(modalContext) {
          var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
          modalClient.invoke('resize', { width: '30 em', height: '20em' });
        });
      }
    });
  });
});
