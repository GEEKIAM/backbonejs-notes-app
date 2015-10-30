define([
  'backbone',
  'marked',
  'hljs'
], function (Backbone) {
  var AddView = Backbone.View.extend({

    className: 'app-view app-adaptive-view app-view-add',
    template: _.template($('#add-view-template').html()),
    events: {
      'click #add-view-open': 'uiOpenOnclick',
      'click #add-view-close': 'uiCloseOnclick',
      'click #add-view-submit': 'createNew'
    },
    initialize: function () {
    },

    render: function () {
      this.$el.html(this.template());

      return this;
    },

    createNew: function (e) {
      e.preventDefault();

      var data = this.uiGetData();

      this.collection.addNote(data);

      this.uiResetForm();
      this.uiCloseOnclick();
    },

    uiGetData: function () {
      return {
        title: this.$el.find('#add-view-title').val(),
        content: this.$el.find('#add-view-content').val()
      }
    },
    uiResetForm: function () {
      this.$el.find('#add-view-title').val('');
      this.$el.find('#add-view-content').val('');
    },

    uiOpenOnclick: function () {
      this.$el.addClass('__active');
    },
    uiCloseOnclick: function () {
      this.$el.removeClass('__active');
    }

  });

  return AddView;
});