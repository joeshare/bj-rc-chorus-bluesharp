<style>

	div.admintree_content_wrap div.left{float: left;width: 100%; height: 100%;margin-bottom: 30px;}
	div.zTreeDemoBackground {width:100%;text-align:left;}

	.expendIcon {
		background-position: -74px -36px;
		line-height: 0;
		margin: 0;
		width: 16px;
		height: 16px;
		display: inline-block;
		vertical-align: middle;
		border: 0 none;
		cursor: pointer;
		outline: none;
		position: absolute;
		top:4px;
		background-color: transparent;
		background-repeat: no-repeat;
		background-attachment: scroll;
		background-image: url("../images/admintree/zTreeStandard.png");
	}

	ul.admintree {width:100%;height:100%;}
	.admintree * {padding:0; margin:0; font-size:14px;}
	.admintree {margin:0; padding:5px; color:#333 ;}
	.admintree li{position: relative; padding:0; margin:0; list-style:none; line-height:23px; text-align:left; white-space:nowrap; outline:0}
	.admintree li ul{ margin:0; padding:0 0 0 18px}
	.admintree li ul.line{ background:url('../images/admintree/line_conn.gif') 0 0 repeat-y;}

	.admintree li a {padding:1px 3px 0 5px; margin:0; cursor:pointer; height:17px; color:#333; background-color: transparent;
		text-decoration:none; vertical-align:top; }
	.admintree li .node_name {
		 max-width: 80%;
		 overflow: hidden;

	}
	.admintree li .parent:hover {

		color: #66c1e3;

	}

	.admintree li .nodelab:hover {
		border-left: 4px solid #66c1e3;
		color: #66c1e3;
		background: rgba(102, 193, 227, 0.11);
		height:24px;
		display: inline-block;
		width:89%;
	}
	.admintree li a.curSelectedNode {
		display: inline-block;
		border-left: 4px solid #66c1e3;
		color: #66c1e3;
		background: rgba(102, 193, 227, 0.11);
		height:24px;
		width:89%;
	}

	.admintree li a.curSelectedNode_Edit {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
	.admintree li a.tmpTargetNode_inner {padding-top:0px; background-color:#316AC5; color:white; height:16px; border:1px #316AC5 solid;
		opacity:0.8; filter:alpha(opacity=80)}
	.admintree li a.tmpTargetNode_prev {}
	.admintree li a.tmpTargetNode_next {}
	.admintree li a input.rename {height:14px; width:80px; padding:0; margin:0;
		font-size:12px; border:1px #7EC4CC solid; *border:0px}
	.admintree li span {line-height:16px; margin-right:2px; top: 3px; display:inline-flex;}
	.admintree li span.button {line-height:0; margin:0; width:16px; height:23px; display: inline-block; vertical-align:middle;
		border:0 none; cursor: pointer;outline:none;
		background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
		background-image:url("../images/admintree/zTreeStandard.png"); *background-image:url("../images/admintree/zTreeStandard.gif")}

	.admintree li span.button.chk {width:13px; height:13px; margin:0 3px 0 0; cursor: auto}
	.admintree li span.button.chk.checkbox_false_full {background-position:0 0}
	.admintree li span.button.chk.checkbox_false_full_focus {background-position:0 -14px}
	.admintree li span.button.chk.checkbox_false_part {background-position:0 -28px}
	.admintree li span.button.chk.checkbox_false_part_focus {background-position:0 -42px}
	.admintree li span.button.chk.checkbox_false_disable {background-position:0 -56px}
	.admintree li span.button.chk.checkbox_true_full {background-position:-14px 0}
	.admintree li span.button.chk.checkbox_true_full_focus {background-position:-14px -14px}
	.admintree li span.button.chk.checkbox_true_part {background-position:-14px -28px}
	.admintree li span.button.chk.checkbox_true_part_focus {background-position:-14px -42px}
	.admintree li span.button.chk.checkbox_true_disable {background-position:-14px -56px}
	.admintree li span.button.chk.radio_false_full {background-position:-28px 0}
	.admintree li span.button.chk.radio_false_full_focus {background-position:-28px -14px}
	.admintree li span.button.chk.radio_false_part {background-position:-28px -28px}
	.admintree li span.button.chk.radio_false_part_focus {background-position:-28px -42px}
	.admintree li span.button.chk.radio_false_disable {background-position:-28px -56px}
	.admintree li span.button.chk.radio_true_full {background-position:-42px 0}
	.admintree li span.button.chk.radio_true_full_focus {background-position:-42px -14px}
	.admintree li span.button.chk.radio_true_part {background-position:-42px -28px}
	.admintree li span.button.chk.radio_true_part_focus {background-position:-42px -42px}
	.admintree li span.button.chk.radio_true_disable {background-position:-42px -56px}

	.admintree li span.button.switch {width:18px; height:24px}
	.admintree li span.button.root_open{background-position:-92px -60px}
	.admintree li span.button.root_close{background-position:-74px -60px}
	.admintree li span.button.roots_open{background-position:-92px 0}
	.admintree li span.button.roots_close{background-position:-74px 0}
	.admintree li span.button.center_open{background-position:-92px -18px}
	.admintree li span.button.center_close{background-position:-74px -18px}
	.admintree li span.button.bottom_open{background-position:-92px -38px}
	.admintree li span.button.bottom_close{background-position:-74px -39px}
	.admintree li span.button.noline_open{background-position:-92px -72px}
	.admintree li span.button.noline_close{background-position:-74px -72px}
	.admintree li span.button.root_docu{ background:none;}
	.admintree li span.button.roots_docu{background-position:-56px 0}
	.admintree li span.button.center_docu{background-position:-56px -18px}
	.admintree li span.button.bottom_docu{background-position:-56px -36px}
	.admintree li span.button.noline_docu{ background:none;}

	.admintree li span.button.ico_open{margin-right:2px; background-position:-110px -16px; vertical-align:top; *vertical-align:middle}
	.admintree li span.button.ico_close{margin-right:2px; background-position:-110px 0; vertical-align:top; *vertical-align:middle}
	.admintree li span.button.ico_docu{margin-right:2px; background-position:-110px -32px; vertical-align:top; *vertical-align:middle}
	.admintree li span.button.edit {margin-right:2px; background-position:-110px -48px; vertical-align:top; *vertical-align:middle}
	.admintree li span.button.remove {margin-right:2px; background-position:-110px -64px; vertical-align:top; *vertical-align:middle}

	/*.admintree li span.button.ico_loading{margin-right:2px; background:url('../images/admintree/loading.gif') no-repeat scroll 0 0 transparent; 
	            vertical-align:top; *vertical-align:middle}*/

	ul.tmpTargetzTree {background-color:#FFE6B0; opacity:0.8; filter:alpha(opacity=80)}

	span.tmpzTreeMove_arrow {width:16px; height:16px; display: inline-block; padding:0; margin:2px 0 0 1px; border:0 none; position:absolute;
		background-color:white; background-repeat:no-repeat; background-attachment: scroll;
		background-position:-110px -80px; background-image:url("../images/admintree/zTreeStandard.png"); *background-image:url("../images/admintree/zTreeStandard.gif")}

	ul.admintree.zTreeDragUL {margin:0; padding:0; position:absolute; width:auto; height:auto;overflow:hidden;
		background-color:#cfcfcf; border:1px #00B83F dotted; opacity:0.8; filter:alpha(opacity=80)}

	.zTreeMask {z-index:10000; background-color:#cfcfcf; opacity:0.0; filter:alpha(opacity=0); position:absolute}

	.loadSyncNode {
		width: 16px;
		height: 16px;
		position: relative;
		display: inline-block;
		background-image:url("data:image/gif;base64,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")
	}

	.admin-select-menu-option-container
	 {
		position: absolute;
		z-index: 9990;
		top: 25px;
		right:0px;
		border: 1px solid #d2d4d9;
		border-radius: 2px;
		padding: 4px 0;
		min-width: 84px;
		padding: 0 0 0 0px !important;
		width: 50%;
		box-shadow:1px 2px 4px #575759;
		display: none;
		background-color: #fff;
	}


	.admin-select-menu-option-container>li {
		height: 28px;
		padding: 0 8px;
		line-height: 28px;
		margin:4px 0px 4px 0px;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		user-select: none;
		cursor: default;
		color: #6f7073;
	}

	.admin-select-menu-option-container>li:hover {
		color: #66c1e3;
		background: rgba(102, 193, 227, 0.11);
	}

</style>

<template>
	<div class="admintree_content_wrap" v-if='treeDataSource.length>0'>
		<div class="zTreeDemoBackground left">
			<ul class="admintree">
				<admintree-item v-for='(m,i) in treeDataSource' :key='i' :model.sync="m" :num.sync='i' root='0' :nodes.sync='treeDataSource.length' :callback='func' :seletedfunc="seleted" :expandfunc='expand' :trees.sync='treeDataSource'></admintree-item>
			</ul>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		data(){
			return {
				treeDataSource:[]
			}
		},
		props:{
			// 树数据
			list:{
				type:Array,
				twoWay:true
			},
			// 点击节点回调
			func:{
				type:Function
			},
			// 点击展开回调
			expand:{
				type:Function
			},
			seleted:{
				type:Function
			},
			// 是否展开
			isOpen:{
				type:Boolean,
				twoWay:true,
				default:false
			}
		},
		methods:{
			initTreeData(){

				var tempList = JSON.parse(JSON.stringify(this.list));

				// 递归操作，增加删除一些属性。比如: 展开/收起
				var recurrenceFunc = (data) => {
					data.forEach((m)=>{

						m.clickNode = m.clickNode;
					/*m.children = m.children || [];
					if(m.children.length>0){
						m.isFolder = this.isOpen;
						m.isExpand = this.isOpen;
						m.loadNode = 0;
						recurrenceFunc(m.children);
					}else{
						delete m.children;
					}*/

					 if(m.children){
					 m.isFolder = this.isOpen;
					 m.isExpand = this.isOpen;
					 m.loadNode = 0;
					 recurrenceFunc(m.children);
					 }else{
					 delete m.children;
					 }
				})
				};
				recurrenceFunc(tempList);
				this.treeDataSource = tempList;
			}
		},
		components:{
			// 组件
			admintreeItem:{
				name: 'admintreeItem',
				mounted () {
					let vm = this
					window.document.addEventListener('click', function selectoptionsHide () {
						 vm.optionDisplay = false
					})
					if(this.model.isFolder)
					{
						if(this.model.children.length!=0)
						{
							if(this.model.children[0].children)
							{
								this.options=[{value:'1',text:'添加子分类',disabled:true}]
							}
							else{
								this.options=[{value:'2',text:'添加标签',disabled:true}]
							}
						}
						else{
							if(this.model.tagClassifyLevel==3)
							{
								this.options=[{value:'2',text:'添加标签',disabled:true}]
							}
						}

					}
				},
				destroyed () {
					window.document.removeEventListener('click', 'selectoptionsHide')
				},
				data(){
					return{
						optionDisplay: false,
						cancelBubblekey:true,
						options:[{value:'1',text:'添加子分类',disabled:true}
						,{value:'2',text:'添加标签',disabled:true}]
					}
				},
				props: {
					model:{
						type:Object,
						twoWay:true
					},
					num:{
						type:Number,
						twoWay:true
					},
					nodes:{
						type:Number,
						twoWay:true,
						default:0
					},
					trees:{
						type:Array,
						twoWay:true,
						default:[]
					},
					root:{
						type:String,
						twoWay:true
					},
					callback:{
						type:Function
					},
					expandfunc:{
						type:Function
					},
					seletedfunc:{
						type:Function
					}
				},
				methods:{
					Func(m){
						if(this.cancelBubblekey) {
							if (typeof this.callback == "function") {
								this.callback.call(null, m);
							}
							if(!m.isFolder){
								// 查找点击的子节点
								var recurFunc = (data) =>{
									data.forEach(function (i) {
										if (i.id == m.id) {
											i.clickNode = true;
										} else {
											i.clickNode = false;
										}
										if (i.children) {
											recurFunc(i.children);
										}
									})
								}
								recurFunc(this.trees);
							}
						}
					},
					seleted(m,option){
						if (typeof this.seletedfunc == "function") {
							this.seletedfunc.call(null, m,option);
						}
						this.optionDisplay = !this.optionDisplay
						event.cancelBubble=true;   /*阻止冒泡*/
					},
					open(m){
						//
						if(this.cancelBubblekey)
						{
							m.isExpand = !m.isExpand;

							if(typeof this.expandfunc == "function" && m.isExpand) {
								if(m.loadNode!=2) {
									//
									this.expandfunc.call(null,m);
								}else {
									//m.isFolder = !m.isFolder;
								}
							} else {
								//m.isFolder = !m.isFolder;
							}
						}
					},
					toggleOptions (event) {
						//console.log('toggleOptions',event)
						this.cancelBubblekey =false;
						let _this =this;
						setTimeout(function () {
							_this.optionDisplay = !_this.optionDisplay
							_this.cancelBubblekey =true;
						},20)
						//event.cancelBubble=true;   /*阻止冒泡*/
					}
				},
				components:{

				},
				computed:{
					// 给（根 和 子树）赋值不同的样式
					rootClass(){
						var strRootClass = '';

						// 根判断
						if(this.root=='0'){
							strRootClass =  (this.num==0 && !this.model.children) ? "roots_docu" : (this.nodes==1) || (this.num==0 && this.nodes!=this.num+1) ?
									"root_" : (this.nodes == this.num+1) ? "bottom_" : "center_"

							// 子树判断
						}else if(this.root=='1') {
							strRootClass =  this.nodes>1 && this.model.children && this.nodes!=this.num+1
									? "center_" :
									(this.num == 0 && this.nodes>1) || (this.nodes!=this.num+1) ? "center_docu" :
											this.nodes == 1&&this.num!=0 || (this.nodes==this.num+1 && this.model.children)   ? "bottom_" : "bottom_docu";
						}

						return  strRootClass
					},
					// 是否有子节点
					isChildren(){
						return this.num+1 != this.nodes;
					},
					// 展开/收起
					prefixClass(){
						var returnChar = "";
						if(this.rootClass.indexOf("docu")==-1){
							if(this.model.isExpand){
								returnChar = "open";
							}else {
								returnChar = 'close'
							}
						}

						if(!this.model.children && this.rootClass.indexOf("docu")==-1){
							returnChar = 'docu'
						}

						return returnChar;
					},
					liClassVal(){
						return "level"+this.num;
					},
					spanClassVal(){
						return "button level"+this.num+" switch "+this.rootClass+this.prefixClass;
					},
					aClassVal(){
						if(this.model.isFolder){
							return "level"+this.num;
						}
						else{
							return this.model.clickNode ? "level"+this.num+' curSelectedNode':"level"+this.num;
						}
					},
					ulClassVal(){
						return this.isChildren && this.model.children ?"level"+this.num+' line':"level"+this.num;
					}
				},
				template:
						`<li :class="liClassVal">
				<span :class="spanClassVal" @click='open(model)'></span>

				<a v-if="model.isFolder" :class="aClassVal" class="parent" @click='open(model);'>
				    <span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span>
				    <span :class='model.iconClass' v-show='model.iconClass' v-else></span>
					<span class="node_name" :title="model.name">{{model.name}}</span>
					 <!-- <admin-icon @click="toggleOptions()" type="ion-android-more-vertical chorus-pointer" >测试点定</admin-icon>-->
					<i class="ion-android-more-vertical"  style="float:right; font-size: 20px; position: absolute; right:0px;" @click='toggleOptions($event)'>&nbsp;</i>
					<ul class="admin-select-menu-option-container" :style="{display:optionDisplay?'block':'none'}" ref="options">
						<li v-for="option in options" @click="seleted(model,option)" ><i class="ion-ios-circle-outline" style="margin-right: 3px;"></i>{{ option.text }}</li>
					</ul>
				</a>
				<a v-else :class="aClassVal"  class="nodelab"  @click='Func(model);'>
				    <span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span>
				    <span :class='model.iconClass' v-show='model.iconClass' v-else></span>
					<span class="node_name"  :title="model.name">{{model.name}}</span>
				</a>
				<ul :class="ulClassVal" v-show='model.isExpand'>
					<admintree-item v-for="(item,i) in model.children" :key='i' :callback='callback' :expandfunc='expandfunc' :seletedfunc="seletedfunc" :model.sync="item" :num.sync='i' root='1' :nodes.sync='model.children.length' :trees.sync='trees'></admintree-item>
				</ul>
			</li>`
			}
		},
		update(){
			this.initTreeData();
		},
		mounted(){
			Vue.nextTick(()=>{
				this.initTreeData();
		})
		},

		watch: {
			list (v) {
				this.initTreeData();
			}
		}
	}
</script>