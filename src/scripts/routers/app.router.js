define([
  'backbone',
  '../collections/notes.collection.js',
  '../views/notes.view.js',
  '../views/add.view.js',
  '../views/show.view.js',
  '../views/edit.view.js'
], function (Backbone, NotesCollection, NotesView, AddView, ShowView, EditView) {
  var $APP_CONTAINER = $('#app');

  var $APP_PRIMARY_VIEWSPACE = $APP_CONTAINER.find('#app-primary-viewspace');
  var $APP_SECONDARY_VIEWSPACE = $APP_CONTAINER.find('#app-secondary-viewspace');

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'note/:id/show': 'show',
      'note/:id/edit': 'edit'
    },

    initialize: function () {
      this.collection = new NotesCollection();

      this.viewspace = {
        primary: new NotesView({ collection: this.collection }),
        secondary: null
      };
      this.renderView('primary');

      this.collection.fetch();

      // Inserts preview data
      window.applyPreviewNotes = function () {
        this.collection.addNote({
          "title": "Just a simple text note",
          "content": "Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.\n\nThe project is hosted on GitHub, and the annotated source code is available, as well as an online test suite, an example application, a list of tutorials and a long list of real-world projects that use Backbone. Backbone is available for use under the MIT software license."
        });

        this.collection.addNote({
          "title": "Markdown note with code block",
          "content": "Highlight.js is a syntax highlighter written in JavaScript. It works in the browser as well as on the server. It works with pretty much any markup, doesn’t depend on any framework and has automatic language detection.\n\n```js\nimport {x, y} as p from 'point';\nconst ANSWER = 42;\n\nclass Car extends Vehicle {\n constructor(speed, cost) {\n super(speed);\n\n var c = Symbol('cost');\n this[c] = cost;\n\n this.intro = `This is a car runs at\n ${speed}.`;\n }\n}\n\nfor (let num of [1, 2, 3]) {\n console.log(num + 0b111110111);\n}\n\nfunction $initHighlight(block, flags) {\n try {\n if (block.className.search(/\\bno\\-highlight\\b/) != -1)\n return processBlock(block.function, true, 0x0F) + ' class=\"\"';\n } catch (e) {\n /* handle exception */\n var e4x =\n <div>Example\n <p>1234</p></div>;\n }\n for (var i = 0 / 2; i < classes.length; i++) { // \"0 / 2\" should not be parsed as regexp\n if (checkCondition(classes[i]) === undefined)\n return /\\d+[\\s/]/g;\n }\n console.log(Array.every(classes, Boolean));\n}\n\nexport $initHighlight;\n```"
        });

        this.collection.addNote({
          "title": "Markdown demonstration",
          "content": "# An exhibit of Markdown\n\nThis note demonstrates some of what [Markdown][1] is capable of doing.\n\n*Note: Feel free to play with this page. Unlike regular notes, this doesn't automatically save itself.*\n\n## Basic formatting\n\nParagraphs can be written like so. A paragraph is the basic block of Markdown. A paragraph is what text will turn into when there is no reason it should become anything else.\n\nParagraphs must be separated by a blank line. Basic formatting of *italics* and **bold** is supported. This *can be **nested** like* so.\n\n## Lists\n\n### Ordered list\n\n1. Item 1\n2. A second item\n3. Number 3\n4. Ⅳ\n\n*Note: the fourth item uses the Unicode character for [Roman numeral four][2].*\n\n### Unordered list\n\n* An item\n* Another item\n* Yet another item\n* And there's more...\n\n## Paragraph modifiers\n\n### Code block\n\n Code blocks are very useful for developers and other people who look at code or other things that are written in plain text. As you can see, it uses a fixed-width font.\n\nYou can also make `inline code` to add code into other things.\n\n### Quote\n\n> Here is a quote. What this is should be self explanatory. Quotes are automatically indented when they are used.\n\n## Headings\n\nThere are six levels of headings. They correspond with the six levels of HTML headings. You've probably noticed them already in the page. Each level down uses one more hash character.\n\n### Headings *can* also contain **formatting**\n\n### They can even contain `inline code`\n\nOf course, demonstrating what headings look like messes up the structure of the page.\n\nI don't recommend using more than three or four levels of headings here, because, when you're smallest heading isn't too small, and you're largest heading isn't too big, and you want each size up to look noticeably larger and more important, there there are only so many sizes that you can use.\n\n## URLs\n\nURLs can be made in a handful of ways:\n\n* A named link to [MarkItDown][3]. The easiest way to do these is to select what you want to make a link and hit `Ctrl+L`.\n* Another named link to [MarkItDown](http://www.markitdown.net/)\n* Sometimes you just want a URL like <http://www.markitdown.net/>.\n\n## Horizontal rule\n\nA horizontal rule is a line that goes across the middle of the page.\n\n---\n\nIt's sometimes handy for breaking things up.\n\n## Images\n\nMarkdown can also contain images. I'll need to add something here sometime.\n\n## Finally\n\nThere's actually a lot more to Markdown than this. See the official [introduction][4] and [syntax][5] for more information. However, be aware that this is not using the official implementation, and this might work subtly differently in some of the little things.\n\n\n [1]: http://daringfireball.net/projects/markdown/\n [2]: http://www.fileformat.info/info/unicode/char/2163/index.htm\n [3]: http://www.markitdown.net/\n [4]: http://daringfireball.net/projects/markdown/basics\n [5]: http://daringfireball.net/projects/markdown/syntax\n"
        });
      }.bind(this);
    },

    index: function () {
      this.viewspace.secondary = new AddView({ collection: this.collection });

      this.renderView('secondary');
    },
    show: function (id) {
      var model = this.collection.get(id);
      if (model) {
        this.viewspace.secondary = new ShowView({ model: model });

        this.renderView('secondary');
      }

    },
    edit: function (id) {
      var model = this.collection.get(id);
      if (model) {
        this.viewspace.secondary = new EditView({ model: model });

        this.renderView('secondary');
      }
    },

    renderView: function (viewspace) {

      if (viewspace.search('primary') + 1) {
        $APP_PRIMARY_VIEWSPACE.empty();
        $APP_PRIMARY_VIEWSPACE.html(this.viewspace.primary.render().el);
      }
      if (viewspace.search('secondary') + 1) {
        $APP_SECONDARY_VIEWSPACE.empty();
        $APP_SECONDARY_VIEWSPACE.html(this.viewspace.secondary.render().el);
      }

    }
  });

  return AppRouter;
});