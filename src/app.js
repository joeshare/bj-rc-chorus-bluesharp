require('./stylesheets/app.scss');
const Vue = require('vue');
const VueRouter = require('vue-router');
const App = require('./app.vue');
var router =require('./router/index.js');
//var nav=require('./modules/nav/index');
Vue.use(VueRouter);
//nav(Vue);
new Vue({
    el: '#appid',
    router: router,
    render: h => h(App)
})

