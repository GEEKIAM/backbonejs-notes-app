define([
  'backbone'
], function (Backbone) {
  var NoteView = Backbone.View.extend({

    tagName: 'li',
    className: 'notes-item',
    template: _.template($('#note-view-template').html()),
    events: {
      'click #note-view-delete': 'deleteModel'
    },

    initialize: function () {
      this.$el.attr('id', this.model.id);

      this.listenTo(this.model, 'change:title', this.uiUpdateTitle);
    },

    render: function () {
      this.$el.html(this.template({
        note: {
          title: this.model.get('title'),
          id: this.model.get('id')
        }
      }));

      return this;
    },

    uiUpdateTitle: function (model, value) {
      this.$el.find('#note-view-title').html(value);
    },
    deleteModel: function () {
      this.model.destroy();
    }
  });

  return NoteView;
});