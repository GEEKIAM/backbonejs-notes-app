define([
  'backbone',
  './note.view.js'
], function (Backbone, NoteView) {
  var NotesView = Backbone.View.extend({

    className: 'app-view app-view-notes',
    template: _.template($('#notes-view-template').html()),

    initialize: function () {
      this.listenTo(this.collection, 'add', this.uiAddOne);
      this.listenTo(this.collection, 'remove', this.uiRemoveOne);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    uiAddOne: function (model) {
      var view = new NoteView({ model: model });

      this.$el.find('#notes-list').prepend(view.render().el);
    },

    uiRemoveOne: function (model) {
      this.$el.find('#notes-list #' + model.id).remove();
    }

  });

  return NotesView;
});