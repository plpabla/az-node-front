require(['js/text!header.html',
         'js/text!footer.html',
         'js/text!body.html'
], 
function(headerTemplate, footerTemplate, bodyTemplate) {
    let app;

    const ApplicationRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "*actions": "home"
        },
        initialize: function() {
            this.headerView = new HeaderView();
            this.headerView.render();
            this.footerView = new FooterView();
            this.footerView.render();
        },
        home: function() {
            this.homeView = new HomeView();
            this.homeView.render();
        },
    });

    const HeaderView = Backbone.View.extend({
        el: "#header",
        template: headerTemplate,
        initialize: function() {},
        render: function() {
            $(this.el).html(_.template(this.template));
        }
    });

    const Placeholder = Backbone.View.extend({
        el: "#body",
        template: headerTemplate,
        initialize: function() {},
        render: function() {
            $(this.el).html(_.template(this.template));
        }
    });

    const FooterView = Backbone.View.extend({
        el: "#footer",
        template: footerTemplate,
        initialize: function() {},
        render: function() {
            $(this.el).html(_.template(this.template));
        }
    });

    const HomeView = Backbone.View.extend({
        el: "#body",
        template: bodyTemplate,
        query: undefined,
        events: {
            "click #send": "saveMessage"
        },
        initialize: function() {
            // TODO
        },
        render: function() {
            messages = undefined
            $(this.el).html(_.template(this.template)({"messages": res}));

        },
        saveMessage: function() {
            data = {"username": $("#username")[0].value,
                    "message": $("#message")[0].value}
            // TODO
        }
    });

    $(document).ready(function() {
        app = new ApplicationRouter();
        Backbone.history.start();
    }) /* document.ready() */
    

}) /* require */



