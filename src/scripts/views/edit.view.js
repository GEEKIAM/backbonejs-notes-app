define(['backbone'], function (Backbone) {
  var EditView = Backbone.View.extend({

    className: 'app-view app-adaptive-view app-view-edit',
    template: _.template($('#edit-view-template').html()),
    events: {
      'click #edit-view-submit': 'updateModel',
      'click #edit-view-cancel': 'cancel'
    },

    render: function () {
      this.$el.html(this.template({ note: this.model.toJSON() }));

      return this;
    },

    cancel: function () {
      Backbone.history.history.back();
    },

    updateModel: function (e) {
      e.preventDefault();

      this.model.set({
        title: this.$el.find('#edit-view-title').val(),
        content: this.$el.find('#edit-view-content').val()
      }, { parse: true }).save();

      Backbone.history.history.back();
    }

  });

  return EditView;
});