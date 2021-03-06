/* global describe, it */

import chai from 'chai';
import aboutTemplate from '../../../src/client/templates/about.jade';

const { expect } = chai;

describe('Template Tests', function() {
  it('template "about" should be a function', function() {
    expect(aboutTemplate).to.be.a('function');
  });
  it('template "about" should render correctly', function() {
    const snippet = aboutTemplate({title: 'TITLE'});
    expect(snippet).to.contain('TITLE');
  });
});
