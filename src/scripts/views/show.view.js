define([
  'backbone'
], function (Backbone) {
  var ShowView = Backbone.View.extend({

    template: _.template($('#show-view-template').html()),
    className: 'app-view-show app-adaptive-view app-view-show',
    events: {
      'click #show-view-delete': 'deleteModel'
    },

    initialize: function () {
      this.listenTo(this.model, 'destroy', function () {
        Backbone.history.navigate('', { trigger: true });
      });
    },

    render: function () {

      this.$el.html(this.template({
        note: {
          title: this.model.get('title'),
          content: this.model.get('compiledContent'),
          id: this.model.get('id')
        }
      }));

      return this;
    },

    deleteModel: function () {
      this.model.destroy();
    }

  });

  return ShowView;
});