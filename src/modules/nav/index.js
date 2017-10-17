/**
 * Created by AnThen on 2017-3-2.
 */
var adMenu =require('adminUI/components/admin-menu');
function configComponent(Vue){
    Vue.component("nav-menu",{
        template:'<div><ad-menu :menu-items="menus" @admin-menu-select="getUrl"></ad-menu></div>',
        created: function () {
            this.menus = _.navMenus.get(this)
        },
        data () {
            return {
                menus: []
            }
        },
        methods: {
           getUrl (item) {
                //this.url = item.url || 'not click a url'
               item.url&&this.$router.push(item.url)
            }
        },
        components: {
            adMenu
        }
    });
}
module.exports = configComponent;