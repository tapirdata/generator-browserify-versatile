'use strict'

module.exports =
  modernizr:
    configPath: '.modernizr.json'
    config:
      minify: false
  karma:
    browsers:
      work: [
        'Chrome'
        'Firefox'
      ]
      ci: [
        'PhantomJS'
      ]

  browserSync:
    browser: null  # use default browser
