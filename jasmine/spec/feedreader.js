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

         //a test to ensure there are feed object defined in allfeed array
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         //a test to ensure each feed has a URL defined and is not empty
         it('have URL defined', function() {
            for (var feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url === "").not.toBe(true);
            }
         });

         //a test to ensure each feed has a name defined and is not empty
         it('have name defined', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name === "").not.toBe(true);
            });
         });

    });


    // test suite named "The menu"
    describe('The menu', function() {

         // a test to ensure the menu element is hidden by default
        it('is hidden by default', function() {
            const menuIsHidden = $('body').hasClass('menu-hidden');
            expect(menuIsHidden).toBe(true);
        });

        // a test to ensure the menu changes visibility when the menu icon is clicked
        it('the menu changes visibility when the menu icon is clicked', function() {
            const menuIcon = $('.menu-icon-link');
            const body = $('body');
            //click the first time
            menuIcon.trigger('click');
            //after first click, menu will appear
            expect(body.hasClass('menu-hidden')).toBe(false);
            //click the second time
            menuIcon.trigger('click');
            //after second click, menu will be hidden
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    //a test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        //a test to ensure after initialize the blog, there is at least a single entry element
        it('there is at least a single .entry element within the .feed container', function() {
            const entry = $(".feed .entry h2").html();
            // entry contains arrays of entry element
            expect(entry.length).toBeGreaterThan(0);
        });
    });



    // a new test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        let load_0;
        let load_1;
        beforeEach(function(done) {
            //get the header content of the first entry as reference
            loadFeed(0,function(){
                // load_0 = $(".feed").children(".entry-link")[0].text;
                load_0 = $(".feed").html();
                loadFeed(1,function(){
                    // load_1 = $(".feed").children(".entry-link")[0].text;
                    load_1 = $(".feed").html();
                    done();
                });
            });
        });

        //a test to ensure content changes when a new feed is loaded
        it('content changes when a new feed is loaded.', function() {
            //if the content changes, the heading content will be different
            expect (load_0 === load_1).toBe(false);
        });
    });
}());
