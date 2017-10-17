/**
 * Created by AnThen on 2017-3-6.
 */
function queryTableData() {
    var num = 10;
    var data = [];
    while (num--) {
        data.push({
            id: (Math.random() / +new Date()).toString(36).replace(/\d/g, '').slice(1),
            name: '项目名称' + Math.round(Math.random() * 30),
            code: Math.round(Math.random() * 30),
            describe: '项目描述' + Math.round(Math.random() * 30),
            //responsible:'项目负责人+Math.round(Math.random()*30)',
            telephone: Math.round(Math.random() * 130),
            creater: '项目创建人' + Math.round(Math.random() * 130),
            createTime: new Date()
        })
    }
    return {
        "code": "0",
        "msg": "成功",
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 10,
            "orderBy": "",
            "startRow": 1,
            "endRow": 10,
            "total": 17,
            "pages": 2,
            "list": [{
                "projectMemberId": "",
                "projectId": 222245,
                "projectCode": "test",
                "projectName": "test",
                "projectDesc": "请勿修改任何该数据信息, 请勿删除任何该数据信息",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222246,
                "projectCode": "aaa",
                "projectName": "aaa",
                "projectDesc": "aaa",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222247,
                "projectCode": "wd_test",
                "projectName": "wd_test",
                "projectDesc": "",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222249,
                "projectCode": "fdsaf",
                "projectName": "OMF",
                "projectDesc": "大丰大厦",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222250,
                "projectCode": "wenbin_test",
                "projectName": "wenbin_test",
                "projectDesc": "wenbin test",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222251,
                "projectCode": "10001",
                "projectName": "aslan_project_one",
                "projectDesc": "袁昊程的测试项目",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222253,
                "projectCode": "abiton_",
                "projectName": "abiton_test2",
                "projectDesc": "",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222254,
                "projectCode": "mbx_project",
                "projectName": "mbx_project",
                "projectDesc": "马伯骁的测试项目",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222255,
                "projectCode": "12121212",
                "projectName": "tonttianta",
                "projectDesc": "大点的",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }, {
                "projectMemberId": "",
                "projectId": 222256,
                "projectCode": "abiton",
                "projectName": "abitontest3",
                "projectDesc": "for test",
                "projectManagerId": "0",
                "managerTelephone": "15898118006",
                "createUserId": "0",
                "userId": "0",
                "roleId": "",
                "roleCode": "",
                "roleName": "",
                "userName": "admin"
            }],
            "firstPage": 1,
            "prePage": 0,
            "nextPage": 2,
            "lastPage": 2,
            "isFirstPage": true,
            "isLastPage": false,
            "hasPreviousPage": false,
            "hasNextPage": true,
            "navigatePages": 8,
            "navigatepageNums": [1, 2]
        }
    }
}
function queryMemberList(){
    var code=0;
    var data={"createUser":"","createTime":1488965924528,"updateUser":"","updateTime":1488965924528,"remark":"","useYn":"","createTimeLabel":"","createTimeLabelSecond":"","iTotalDisplayRecords":8,"aaData":[{"projectMemberId":222300,"projectId":222245,"projectCode":"test","projectName":"test","projectDesc":"请勿修改任何该数据信息, 请勿删除任何该数据信息","projectManagerId":"0","managerTelephone":"","createUserId":"0","userId":"9a85f312-f120-4ac3-8268-ea86b51a2529","roleId":"3","roleCode":"913","roleName":"查询","userName":"test123"},{"projectMemberId":222581,"projectId":222245,"projectCode":"test","projectName":"test","projectDesc":"请勿修改任何该数据信息, 请勿删除任何该数据信息","projectManagerId":"0","managerTelephone":"","createUserId":"0","userId":"6ded938d-d275-4a08-bcd4-918d3d5c7069","roleId":"1","roleCode":"911","roleName":"开发","userName":"lizhiwei"},{"projectMemberId":222582,"projectId":222245,"projectCode":"test","projectName":"test","projectDesc":"请勿修改任何该数据信息, 请勿删除任何该数据信息","projectManagerId":"0","managerTelephone":"","createUserId":"0","userId":"3ff21567-feb3-41dc-929e-da0ceb87eaf9","roleId":"5","roleCode":"915","roleName":"Admin","userName":"yyl"},{"projectMemberId":222583,"projectId":222245,"projectCode":"test","projectName":"test","projectDesc":"请勿修改任何该数据信息, 请勿删除任何该数据信息","projectManagerId":"0","managerTelephone":"","createUserId":"0","userId":"307e5c3a-ab7b-4ba2-9e89-e69bc5b71f13","roleId":"5","roleCode":"915","roleName":"Admin","userName":"abiton"},{"projectMemberId":222584,"projectId":222245,"projectCode":"test","projectName":"test","projectDesc":"请勿修改任何该数据信息, 请勿删除任何该数据信息","projectManagerId":"0","managerTelephone":"","createUserId":"0","userId":"506bb5c2-d2ea-4c5a-9299-e18d6ff53c0a","roleId":"5","roleCode":"915","roleName":"Admin","userName":"empty"},{"projectMemberId":222585,"projectId":222245,"projectCode":"test","projectName":"test","projectDesc":"请勿修改任何该数据信息, 请勿删除任何该数据信息","projectManagerId":"0","managerTelephone":"","createUserId":"0","userId":"e2944a3c-1b91-438e-ad0f-b7e39636804f","roleId":"1","roleCode":"911","roleName":"开发","userName":"lihongzhe"},{"projectMemberId":222586,"projectId":222245,"projectCode":"test","projectName":"test","projectDesc":"请勿修改任何该数据信息, 请勿删除任何该数据信息","projectManagerId":"0","managerTelephone":"","createUserId":"0","userId":"ceeaf179-f08f-4db7-a647-476021415bad","roleId":"3","roleCode":"913","roleName":"查询","userName":"shicheng"},{"projectMemberId":222610,"projectId":222245,"projectCode":"test","projectName":"test","projectDesc":"请勿修改任何该数据信息, 请勿删除任何该数据信息","projectManagerId":"0","managerTelephone":"","createUserId":"0","userId":"e4fd3510-e9a0-4e9b-baa4-c331cbd20342","roleId":"3","roleCode":"913","roleName":"查询","userName":"lengyang"}]};
    return {
        code,
        data
    };
}

function queryResourceConfig(){
    return {"code":"0","msg":"成功","data":[{"instanceId":86,"projectId":222245,"resourceInnerId":8,"instanceSize":1,"groupName":"1","createTime":1483584539000,"updateTime":1483584539000,"instanceDesc":"1","commonStatus":{"statusId":"","statusCode":"2004","statusName":"已销毁","statusType":"20"},"resourceTemplate":{"resourceTemplateId":5,"resourceName":"container-locality-template","resourceCpu":1,"resourceMemory":2,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""},{"instanceId":132,"projectId":222245,"resourceInnerId":50,"instanceSize":1,"groupName":"111","createTime":1486542526000,"updateTime":1486542526000,"instanceDesc":"323","commonStatus":{"statusId":"","statusCode":"2003","statusName":"已停止","statusType":"20"},"resourceTemplate":{"resourceTemplateId":5,"resourceName":"container-locality-template","resourceCpu":1,"resourceMemory":2,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""},{"instanceId":133,"projectId":222245,"resourceInnerId":50,"instanceSize":1,"groupName":"222","createTime":1486542567000,"updateTime":1486542567000,"instanceDesc":"234","commonStatus":{"statusId":"","statusCode":"2002","statusName":"已启动","statusType":"20"},"resourceTemplate":{"resourceTemplateId":5,"resourceName":"container-locality-template","resourceCpu":1,"resourceMemory":2,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""},{"instanceId":111,"projectId":222245,"resourceInnerId":8,"instanceSize":1,"groupName":"azyd222","createTime":1483928851000,"updateTime":1483928851000,"instanceDesc":"232","commonStatus":{"statusId":"","statusCode":"2004","statusName":"已销毁","statusType":"20"},"resourceTemplate":{"resourceTemplateId":5,"resourceName":"container-locality-template","resourceCpu":1,"resourceMemory":2,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""},{"instanceId":134,"projectId":222245,"resourceInnerId":50,"instanceSize":1,"groupName":"ccone","createTime":1487041890000,"updateTime":1487041890000,"instanceDesc":"1","commonStatus":{"statusId":"","statusCode":"2002","statusName":"已启动","statusType":"20"},"resourceTemplate":{"resourceTemplateId":5,"resourceName":"container-locality-template","resourceCpu":1,"resourceMemory":2,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""},{"instanceId":137,"projectId":222245,"resourceInnerId":50,"instanceSize":1,"groupName":"test 22222","createTime":1487146058000,"updateTime":1487146058000,"instanceDesc":"1","commonStatus":{"statusId":"","statusCode":"2002","statusName":"已启动","statusType":"20"},"resourceTemplate":{"resourceTemplateId":5,"resourceName":"container-locality-template","resourceCpu":1,"resourceMemory":2,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""},{"instanceId":131,"projectId":222245,"resourceInnerId":50,"instanceSize":1,"groupName":"test3","createTime":1486453585000,"updateTime":1486453585000,"instanceDesc":"1","commonStatus":{"statusId":"","statusCode":"2002","statusName":"已启动","statusType":"20"},"resourceTemplate":{"resourceTemplateId":5,"resourceName":"container-locality-template","resourceCpu":1,"resourceMemory":2,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""},{"instanceId":136,"projectId":222245,"resourceInnerId":50,"instanceSize":1,"groupName":"test11111","createTime":1487145901000,"updateTime":1487145901000,"instanceDesc":"1","commonStatus":{"statusId":"","statusCode":"2002","statusName":"已启动","statusType":"20"},"resourceTemplate":{"resourceTemplateId":8,"resourceName":"container-nolocality-template-2c4g","resourceCpu":2,"resourceMemory":4,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""},{"instanceId":138,"projectId":222245,"resourceInnerId":50,"instanceSize":1,"groupName":"test4","createTime":1487146638000,"updateTime":1487146638000,"instanceDesc":"1","commonStatus":{"statusId":"","statusCode":"2002","statusName":"已启动","statusType":"20"},"resourceTemplate":{"resourceTemplateId":8,"resourceName":"container-nolocality-template-2c4g","resourceCpu":2,"resourceMemory":4,"resourceStorage":1,"createTime":"","updateTime":"","statusCode":""},"environmentInfoList":[{"environmentId":1,"environmentName":"java","environmentVersion":"1.8","createTime":"","updateTime":"","statusCode":""}],"resourceCpu":"","resourceMemory":""}]};
}
function externalResource(){
    return {code:0,"msg":"",data:{"createUser":"","createTime":1489027943885,"updateUser":"","updateTime":1489027943885,"remark":"","useYn":"","createTimeLabel":"","createTimeLabelSecond":"","iTotalDisplayRecords":1,"aaData":[{"resourceOutId":53,"projectId":222245,"resourceName":"test","resourceSource":"","resourceUsage":"2","resourceDesc":"","storageType":"1","connUrl":"jdbc:mysql://localhost:3306/null","connPort":"3306","connUser":"root","connPass":"root","createUserId":"0","createTime":1482837124000,"updateUserId":"","updateTime":"","endDate":"","statusCode":"","databaseName":"","userName":"admin","usageName":"开发","typeName":"MySQL"}]}};
}
function queryResCfgBaseInfo(){
    return {"code":"0","msg":"成功","data":{"resourceInnerId":50,"projectId":222245,"createUserId":"3ff21567-feb3-41dc-929e-da0ceb87eaf9","resourceCpu":1,"resourceMemory":2,"resourceStorage":500,"createTime":1486453568000,"updateTime":1486453568000,"statusCode":"1101"}};
}
module.exports = {
    queryTableData,
    queryMemberList,
    queryResourceConfig,
    externalResource,
    queryResCfgBaseInfo
};