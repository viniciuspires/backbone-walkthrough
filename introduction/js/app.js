/* -- Code for Part 1
Person = Backbone.Model.extend({
    initialize:function(){
        this.bind('change:name', function(){
            console.log(this.get('name') + ' is now the value for name');
        });
        this.bind('invalid', function(model, error){
            console.log(error);
        });
    },
    defaults:{
        name:'Bob Hope',
        height:'unknown'
    },
    validate:function( attributes ) {
        if (attributes.name == "Joe") {
            return "Uh oh, your name is Joe!";
        }
    }
});

var person = new Person();
person.set('name', 'Joe', {validate:true});
person.set({name:'Pires',height:1.78});
person.set('name', "Joe", {validate:true});

console.log(person.attributes);
*/

/* -- Code for Part 2
model = new Backbone.Model({
    data:[
        {text:"Google",href:"http://google.com"},
        {text:"Facebook",href:"http://facebook.com"},
        {text:"Youtube",href:"http://youtube.com"}
    ]
});

var View = Backbone.View.extend({
    initialize:function(){
        this.template = $('#list-template').children();
    },
    el:'#container',
    events:{
        'click button':'render'
    },
    render:function(){
        var data = this.model.get('data');

        for (var i = 0; i < data.length; i++) {
            var li = this.template.clone().find('a')
                                  .attr('href', data[i].href)
                                  .text(data[i].text).end();
            this.$el.find('ul#list').append(li);
        }
    }
});

var view = new View({model:model});
*/

/* -- Code for Part 3 */
var Router = Backbone.Router.extend({
    routes:{
        "foo/:bar":"paramtest",
        "*action":"func",
    },
    func:function(action){
        console.log(action);
    },
    paramtest:function(p){
        console.log(p);
    }
});

new Router();

Backbone.history.start();