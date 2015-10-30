define([
  'backbone',
  '../models/note.model.js',
  'localstorage'
], function (Backbone, NoteModel) {
  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage('notes'),

    addNote: function (model) {
      return this.create(model, { wait: true, parse: true });
    }
  });

  return NotesCollection;
});