define([

    "backbone",
    "plugins/backbone.marionette",

    "slickgrid"

], function (Backbone, Marionette, SlickGrid) {


    var view = Marionette.ItemView.extend({
        template:"objects",

        initialize:function (attributes) {
            debug("Initialize view objects");
        },

        onShow:function () {
            $('#object_tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });


            var rows = [
                {
                    field_1:"value1",
                    field_2:"value2"
                },
                {
                    field_1:"value3",
                    field_2:"value4"
                }
            ];

            var columns = [
                {id:"field_1", name:"Title", field:"field_1"},
                {id:"field_2", name:"Duration", field:"field_2"}
            ];

            var options = {
                enableCellNavigation:true,
                enableColumnReorder:false
            };

            var slickgrid = new Slick.Grid("#object_instances", rows, columns, options);


        },

        events:{


        }


    });


    return view;
});