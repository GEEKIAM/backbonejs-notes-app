define([
  'backbone',
  'marked',
  'hljs',
  'underscore'
], function (Backbone, marked, highlightjs, _) {

  var NoteModel = Backbone.Model.extend({
    defaults: {
      title: 'Unnamed',
      content: 'There is no content yet'
    },

    initialize: function () {
      this.set('compiledContent', this.compileMarkdown(this.get('content')));

      this.listenTo(this, 'change:content', function (model, value) {
        this.set('compiledContent', this.compileMarkdown(value));
      })
    },

    parse: function (data) {
      data.title = data.title || undefined;
      data.content = data.content || undefined;

      return data;
    },

    compileMarkdown: function (content) {
      marked.setOptions({
        highlight: function (code) {
          return highlightjs.highlightAuto(code).value;
        }
      });

      return marked(content);
    }
  });

  return NoteModel;
});