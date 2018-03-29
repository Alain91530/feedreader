/*******************************************************************************
			Comments for eslint setting
*******************************************************************************/
/* global allFeeds:true loadFeed*/
/* eslint no-undef: "error" */
/* eslint-env jquery*/
/******************************************************************************/

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have an URL', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have a name', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });


  /*Test suite for the menu */
  describe('The menu', function() {

    /* Test that ensures the menu element is
     * hidden by default. This test check that body has the class menu-hidden.
     * this class assure the menu hide putting it off canvas with a transition
     * effect. The hiding/showing of the menu element is realized with the use
     * of menu-hidden and slide-menu classes according to the position expected.
     */
    it('is hidden by default', function(){
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
    /* Test that ensures the menu changes visibility when the menu icon
       is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    it('changes visibily when clicked', function() {
      /* Simulate the first click and check state of menu */
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      /* Simulate second click and check state of menu */
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);

    });
  });
  /* Test suite for the "Initial Entries" */
  describe('Initial Entries', function() {
    /*   TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done){
      loadFeed(0,function (){
        done();
      });
      expect();
    });

  });
  /* Test suite to check "New Feed Selection" changes*/
  describe('New Feed Section', function() {


    /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
  });
});
