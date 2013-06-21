// Url do servidor REST do cara...
$.ajaxPrefilter(function(options, originalOptions, jqXhr) {
    options.url = 'http://backbonejs-beginner.herokuapp.com/' + options.url;
});

// Collection de usuários
var Users = Backbone.Collection.extend({
    url:'/users'
});

// View da lista de Usuários
var UserList = Backbone.View.extend({
    el:'.page',
    render:function(){
        var that = this;
        var users = new Users();
        users.fetch({
            success:function(users){
                var tpl = _.template( $('#user-list-template').html(), {users: users.models} );
                that.$el.html(tpl);
            }
        });
    }
});

var EditUser = Backbone.View.extend({
    el:'.page',
    render:function(){
        var tpl = _.template( $('#edit-user-template').html(), {} );
        this.$el.html(tpl);
    }
});

// Roteador da applicação
var Router = Backbone.Router.extend({
    routes:{
        // Rota raiz aponta para o "evento" home
        '':'home',
        'new':'editUser'
    }
});

var userList = new UserList(); // Instanciando a collection

var editUser = new EditUser(); // Instanciado View do formulário

var router = new Router(); // Instanciando o roteador

// Atribuindo um handler para o "evento" home
router.on('route:home', function(){
    // Renderiza a view de lista de usuários
    userList.render();
});
router.on('route:editUser', function(){
    editUser.render();
});

// Necessário para poder utilizar a funcionalidade do botão de voltar e guardar hashes no histórico como se fossem query strings
Backbone.history.start();