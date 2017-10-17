/**
 * Created by AnThen on 2017-3-3.
 */
import AdInput from 'adminUI/components/admin-input';
import AdModal from 'adminUI/components/admin-modal';
import AdPaginator from 'adminUI/components/admin-paginator.vue';
import Toast from 'adminUI/components/admin-toast/index';
import navBar  from '../../admin-ui-extend/components/admin-navbar.vue';
import adInputEdit from '../../admin-ui-extend/components/admin-input-edit.vue'
import CONSTANT  from 'Utils/constant';
export default {
    components: {
        AdInput,
        AdModal,
        AdPaginator,
        navBar,
        Toast,
        adInputEdit
    },
    
    data () {
        let columns=[
            {code:'name',text:'项目名称'},
            {code:'code',text:'项目编码'},
            {code:'describe',text:'项目描述'},
            {code:'responsible',text:'项目负责人/电话'},
            {code:'createTime',text:'创建时间'}
        ];
        let _this=this;
        return {
            navlist:[{id:1,text:'数据图可视化',url:''},{id:2,text:'历史可视化规则',url:''}],
            data:[],
            totalCount: 0,
            pageSize:CONSTANT.pageSize,
            currentPage: 1,
            searchname:''
        }
    },
    created() {

        this.fetchData(1);
    },
    methods: {
        togglePage(indexPage){
            this.fetchData(indexPage)
        },
        newrole () {
            window.location.hash="queryvisualization/desc/create/0";
        },
        prospect (rec) {
              window.location.hash=`queryvisualization/desc/snapshoot/${rec.id}`;
        },
        fetchData(curPage){
            let _this=this;
            let projectInfo = _.currentProjectInfo.get();
                _.ajax({
                    url:'/api/queryvisuallist/list',
                    method:'POST',
                    data:{
                        pageNum:curPage,
                        pageSize:_this.pageSize,
                        ruleName:_this.searchname,
                        projectCode:projectInfo.projectCode
                    },
                    success:function(res){
                        if(res.code=="0"){
                            _this.data=res.data.list;
                            _this.data&&_this.data.forEach((ec)=>{
                                ec.createTime =  _.date2String(new Date(ec.createTime),'yyyy-MM-dd hh:mm:ss');
                            })
                            _this.totalCount=res.data.total;
                        }else{
                            _this.data=[];
                        }
                    },
                    error:function(res){

                    }
                })
        }

    }

}
