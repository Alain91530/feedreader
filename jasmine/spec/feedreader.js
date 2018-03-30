/*******************************************************************************
			Comments for eslint setting
*******************************************************************************/
/* global allFeeds:true loadFeed                                              */
/* eslint no-undef: "error"                                                   */
/* eslint indent: ["error", 2, { "VariableDeclarator": 2 }]                   */
/* eslint-env jquery                                                          */
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
    /* Test that ensures when the loadFeed function is called and completes
     * its work, there is at least single .entry element within the .feed
     * container.
     * loadFeed() is asynchronous so this I use beforeEach and asynchronous
     * done() callback function.
     */
    beforeEach(function(done){
      loadFeed(0,function (){
        done();
      });
    });
    /* Get elements with the .entry class and check the length to be sure at
     * at least one element exists.
     */
    it('has at least one entry', function() {
      let entries = $('.feed .entry');
      expect(entries.length).toBeGreaterThan(0);
    });
  });

  /* Test suite to check "New Feed Selection" changes*/
  describe('New Feed Section', function() {

    /* Variables where the html of feeds will be stored */
    let firstFeed,
        secondFeed;
    /* I first check that there are at least 2 feeds to load. */
    it('another feed section exists', function() {
      expect(allFeeds.length).toBeGreaterThan(1);
    });
    /* Nested suite to avoid loading feeds twice with beforeEach
     * Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    describe('Load another feed', function() {

    /* At least 2 feeds exist we load them with the done() callback function
     * and store the list of links elements of the first one in firstFeed.
     */
      beforeEach(function(done){
      /* Load second feed of allFeeds array with a callback which will
       * reload the first feed of the array
       */
        loadFeed(1,function(){
        // Wait till it's done and Store the loaded feed for future testing
          firstFeed = $('.feed').html();
          /* load the first feeds of allFeeds with a call back function waiting
         * for the feed to be loaded.
         * Doing in this order will let the page in the same state as
         * before testing
         */
          loadFeed(0, function(){
          // wait till it's done
          // Store the loaded feed for future testing
            secondFeed = $('.feed').html();
            done();
          });
        });
      });
      /* We have 2 feeds loaded, we check that the html content of each
     * feed are different.
     */
      it('feed section has been loaded and is different', function() {
        expect(firstFeed).not.toBe(secondFeed);
      });
    });
  });
});
