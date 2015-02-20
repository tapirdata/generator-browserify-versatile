'use strict'

### global curl ###

appBaseUrl = '<%%= appBaseUrl %>'
vendorBaseUrl = '<%%= vendorBaseUrl %>'

curl.config
  paths:
    app: appBaseUrl
    curl: vendorBaseUrl + '/curl/src/curl'
    jquery: vendorBaseUrl + '/jquery/dist/jquery'
    underscore: vendorBaseUrl + '/lodash/dist/lodash'<% if (use.backbone) { %>
    backbone:
      location: vendorBaseUrl + '/backbone/backbone'
      transform: 'curl/cjsm11'
    <% } %><% if (use.bootstrap) { %>bootstrap:
      location: vendorBaseUrl +
        '/bootstrap-sass-official/assets/javascripts/bootstrap'
      config:
        loader: 'curl/loader/legacy'
        factory: ->
    <% } %>jade: vendorBaseUrl + '/jade/runtime'
  packages: [
    {
      name: 'poly'
      location: vendorBaseUrl + '/poly'
      main: 'poly'
    }
    {
      name: 'when'
      location: vendorBaseUrl + '/when'
      main: 'when'
    }
  ]<% if (use.bootstrap) { %>
  preloads: ['jquery']<% } %>


curl [
  'app/scripts/app-starter'<% if (use.bootstrap) { %>
  'bootstrap'<% } %>
], (appStarter) ->
  appStarter()
  return