define([

    "backbone",
    "plugins/backbone.marionette",

    "slickgrid"

], function (Backbone, Marionette, SlickGrid) {


    var view = Marionette.ItemView.extend({
        template:"auth",

        initialize:function (attributes) {
            debug("Initialize view dummy auth");
        },

        onShow:function () {
            $('#auth_tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            var users = [
                {
                    user_name: "agent1",
                    password: "s3creT",
                    access_token: "1122333312lckckkc"
                },
                {
                    user_name: "agent2",
                    password: "s3creT",
                    access_token: "1122333312lckckkc"
                },
                {
                    user_name: "agent3",
                    password: "s3creT",
                    access_token: "1122333312lckckkc"
                }
            ];

            var user_columns = [
                {id:"user_name", name:"Name", field:"user_name"},
                {id:"password", name:"Password", field:"password"},
                {id:"access_token", name:"Token", field:"access_token"}
            ];

            var options = {
                enableCellNavigation:true,
                enableColumnReorder:false
            };

            var users_grid = new Slick.Grid("#users", users, user_columns, options);
        },

        events:{

        }


    });


    return view;
});