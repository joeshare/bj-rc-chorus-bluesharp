/**
 * Created by AnThen on 2017-8-8.
 */
exports.getChart = ()=> {
    return {
        "code": 0,
        "data": {
            "edgeOutputs": [
                {
                    "properties": [
                        {
                            "name": "边ID",
                            "value": "123456789887654321",
                            "code": "id"
                        },
                        {
                            "name": "关系名称",
                            "value": "zhangsan@163.com",
                            "code": "relationName"
                        }
                    ],
                    "statisticses": [
                        {
                            "name": "边ID",
                            "value": "123456789887654321",
                            "code": "id"
                        },
                        {
                            "name": "边属性个数",
                            "value": "2",
                            "code": "propertyCount"
                        }
                    ],
                    "settings": [
                        {
                            "name": "边ID",
                            "code": "id"
                        },
                        {
                            "name": "关系名称",
                            "code": "relationName"
                        }
                    ],
                    "relationtype": "userInfoRelation",
                    "fromVertexId": 123456789,
                    "endVertexId": 123456788
                }
            ],
            "vertexOutputs": [
                {
                    "properties": [
                        {
                            "name": "顶点ID",
                            "value": "123456789",
                            "code": "id"
                        },
                        {
                            "name": "邮箱",
                            "value": "zhangsan@163.com",
                            "code": "email"
                        }
                    ],
                    "statisticses": [
                        {
                            "name": "顶点ID",
                            "value": "123456789",
                            "code": "id"
                        },
                        {
                            "name": "顶点属性个数",
                            "value": "2",
                            "code": "propertyCount"
                        }
                    ],
                    "settings": [
                        {
                            "name": "顶点ID",
                            "code": "id"
                        },
                        {
                            "name": "邮箱",
                            "code": "email"
                        }
                    ],
                    "entityType": "userInfo",
                    "centerVertex": true
                },
                {
                    "properties": [
                        {
                            "name": "顶点ID",
                            "value": "123456788",
                            "code": "id"
                        },
                        {
                            "name": "邮箱",
                            "value": "zhangsi@163.com",
                            "code": "email"
                        }
                    ],
                    "statisticses": [
                        {
                            "name": "顶点ID",
                            "value": "123456788",
                            "code": "id"
                        },
                        {
                            "name": "顶点属性个数",
                            "value": "2",
                            "code": "propertyCount"
                        }
                    ],
                    "settings": [
                        {
                            "name": "顶点ID",
                            "code": "id"
                        },
                        {
                            "name": "邮箱",
                            "code": "email"
                        }
                    ],
                    "entityType": "userInfo",
                    "centerVertex": false
                }
            ]
        },
        "date": "2017-08-08",
        "msg": "success",
        "total": 1,
        "vertexCount": 2,
        "edgeCount": 1
    }
}