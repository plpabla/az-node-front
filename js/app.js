require(['js/text!header.html',
         'js/text!footer.html',
         'js/text!body.html'
], 
function(headerTemplate, footerTemplate, bodyTemplate) {
    const BACKEND_URL = "https://pabla-node.azurewebsites.net/"
    const MESSAGES_LIST_URL = BACKEND_URL + "messages/list"
    const MESSAGES_ADD_URL = BACKEND_URL + "messages/create"
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
        events: {
            "click #send": "saveMessage"
        },
        initialize: function() {
            getMessages(this)
        },
        render: function() {
            getMessages(this)
        },
        saveMessage: function() {
            data = {"name": $("#username")[0].value,
                    "message": $("#message")[0].value}
            addMessage(this, data)
        }
    });

    function getMessages(view) {
        const request = $.ajax({
            url: MESSAGES_LIST_URL,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                $(view.el).html(_.template(view.template)({"messages": data}));
            }
        })
    }

    function addMessage(view, data) {
        console.log("add")
        const request = $.ajax({
            url: MESSAGES_ADD_URL,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function() {
                console.log("refresh")
                view.render()
            },
            error: function(_, msg) {
                console.log(`Failed... ${msg}`)
                view.render()
            }
        })
    }

    $(document).ready(function() {
        app = new ApplicationRouter();
        Backbone.history.start();
    }) /* document.ready() */
}) /* require */



