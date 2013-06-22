$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function(){
        if ( o[this.name] !== undefined ) {
            if ( !o[this.name].push ) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// Url do servidor REST do cara...
$.ajaxPrefilter(function(options, originalOptions, jqXhr) {
    options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
});

var User = Backbone.Model.extend({
    urlRoot:'/users'
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
    render:function(options){
        if (options.id) {
            var that = this;
            this.user = new User({id:options.id});
            this.user.fetch({
                success:function(user){
                    var html = _.template( $('#edit-user-template').html(), {user:user} );
                    that.$el.html( html );
                }
            });
        } else {
            var tpl = _.template( $('#edit-user-template').html(), {user:null} );
            this.$el.html(tpl);
        }
    },
    events:{
        'submit .edit-user-form':'saveUser',
        'click #delete':'deleteUser'
    },
    saveUser:function(e){
        var userData = $(e.currentTarget).serializeObject();
        var user = new User();

        user.save(userData, {
            success:function(){
                router.navigate('', {trigger:true});
            }
        });

        return false;
    },
    deleteUser:function(e){
        this.user.destroy({
            success:function(){
                router.navigate('', {trigger:true});
            }
        });
        return false;
    }
});

// Roteador da aplicação
var Router = Backbone.Router.extend({
    routes:{
        // Rota raiz aponta para o "evento" home
        '':'home',
        'new':'editUser',
        'edit/:id':'editUser',
        'delete/:id':''
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
router.on('route:editUser', function(id){
    editUser.render({id:id});
});

// Necessário para poder utilizar a funcionalidade do botão de voltar e guardar hashes no histórico como se fossem query strings
Backbone.history.start();

$(document).ready(function(){
    $('[data-tooltip]').tooltip();
});