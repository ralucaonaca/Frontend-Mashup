/**
 * Created by ralucaonaca on 12/30/15.
 */
casper.start('http:///cta-link.html')
    .then(function() {
        phantomcss.screenshot('.cta-link', 'cta-link');
    })
    .then(function() {
        this.mouse.move('.cta-button');
        phantomcss.screenshot('.cta-link', 'cta-link-hover');
    });
