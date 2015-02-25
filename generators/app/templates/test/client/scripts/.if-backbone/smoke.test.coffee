'use strict'

### global describe, before, it ###

$          = require 'jquery'
w          = require 'when'
chai       = require 'chai'
appStarter = require '../../../src/client/scripts/app-starter'
sm         = require './smoke-helper'

expect = chai.expect

describe 'The Application', ->
  @timeout 10000
  $testMain = undefined
  before ->
    $testMain = $('<div id="body-container" class="container" />')
    .appendTo('body')
    appStarter()
    return
  it 'should show the home page', ->
    expect($ 'div.jumbotron').to.have.length 1
    expect($ 'ul.nav li:nth-child(1)').$class 'active'
  it 'should show the about page', ->
    w()
    .delay 200
    .then ->
      console.log 'click about'
      sm.activateLink $ 'ul.nav li:nth-child(2) a'
    .then -> sm.retry ->
      expect($ 'div.jumbotron').to.have.length 0
  it 'should show something', ->
    w().delay(800)

