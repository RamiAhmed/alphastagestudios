var jqmReady = $.Deferred(),
    pgReady = $.Deferred();

// jqm page is ready
$(document).bind("pageinit", jqmReady.resolve);

// phonegap ready
document.addEventListener("deviceready", pgReady.resolve, false);

// all ready, throw a custom 'PG_pageinit' event
$.when(jqmReady, pgReady).then(function () {
  $(document).trigger('PG_pageinit');
});
