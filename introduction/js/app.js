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

/* -- Code for Part 3
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
*/

/* -- Code for part 4
var Person = Backbone.Model.extend({
    initialize:function(){
        console.log('person init');
    },
    defaults: {
        name:'unknown',
        age:'unknown',
        id:0
    }
});

var People = Backbone.Collection.extend({
    initialize:function(){
        console.log('people collection init');
    },
    model:Person,
    // o método add ordena pelo comparador
    comparator:function(person1, person2){
        return person1.get('name') > person2.get('name');
    }
});

var person = new Person({name:'Pires'});

var people = new People(person);

people.add([{name:'Bob'},{name:"Jim"}]);
console.log(people.toJSON());

people.remove(person);
console.log(people.toJSON());

people.reset([{name:'Bob'},{name:'Pires',id:3}]);
console.log(people.toJSON());

console.log(people.get(3)); // Busca pelo id do servidor
console.log(people.get('c0')); //Busca pelo id do Cliente
console.log(people.at(1)); // Busca pelo índice da lista

// people.push, people.pop, people.shift, people.unshift

people.sort();  // Se precisar reordenar a collection, por usar push-pop ou editar alguma propriedade que é usada na ordenação

console.log( people.pluck('name') ); // Retorna um array apenas com o campo especificado

console.log( people.where({name:'Bob'}) ); // Busca pela propriedade informada
*/

/* -- Code for part 5 */

$.ajaxPrefilter(function(options, originalOptions, jqXhr) {
    options.url = 'http://localhost:3000' + options.url;
});

var Person = Backbone.Model.extend({
    initialize:function(){
        this.on('all', function(e){
            console.log(this.get('name')+' event: ' + e);
        });
    },
    defaults:{
        name:'unknown',
        age:'unknown'
    },
    url:'/people'
});

var People = Backbone.Collection.extend({
    initialize:function(){
        this.on('all', function(e){
            console.log('People Event: ' + e );
        });
    },
    model:Person
});

