/**
 * @author Guo Yuchun
 * @date   2018/3/17
 * @Description: 添加试卷组件
 */
'use strict';

require(['less!addPaperStyle']);

define([
    'text!addPaperView',
    'questionManage',
    'vue'
], function (
    _view,
    questionManage,
    vue
) {
    var self ;
    return {
        template: _view,
        /**
         * 属性说明
         * @property {String} paperName 试卷名称
         * @property {String} paperClassify 试卷分类（考试、练西）
         * @property {Number} score 总分
         * @property {Number} share 是否共享
         * @property {String} subject 科目
         * @property {Number} year 重复率限制年份
         * @property {Number} under 重复率限制百分比
         * @property {Array} question 试卷题目结构（大题题目、总分、包含小题内容及得分）
         * @property {Number} index 记录点击选择试题的大题下标
         * @property {Array} order 大题标号
         *
         * @property {Boolean} isQuesOperation 试题管理组件是否显示操作栏
         * @property {Boolean} isRate 是否显示重复率控制盒子
         */
        data: function () {
            self= this
            return{

                paperName: '',
                paperClassify: '',
                score: '',
                share: '',
                subject: '',
                year: '',
                under: '',
                question: [],
                index:'',
                order: ['一', '二','三','四','五','六','七','八','九'],

                isQuesOperation: false,
                isRate: false,
            }
        },
        methods:{
            /**
             * 重复率显示与隐藏
             * @method
             * @param {object} event 事件
             * @return
             */
            rateShow: function (event) {
                self.isRate = event.target.checked ? true:false ;
            },
            /**
             * 添加试题描述（大题）
             * @method
             * @param
             * @return
             */
            addQuesDescribe: function () {
                self.question.push({
                    titleDescribe:'',
                    score:'',
                    questionGroup:[]
                });
            },
            /**
             * 将试题管理组件回传的选择试题列表添加至question中
             * @method
             * @param {Array} questionList 选择的试题列表
             * @return
             */
            selectQuestion: function (questionList) {
                questionList.forEach(function (t) {
                    self.question[self.index].questionGroup.push(t);
                });
                console.log(self.question);

            },
            /**
             * 记录选择试题模态框所对应大题下标、打开模态框
             * @method
             * @param {Number} index 当前选择试题所对应大题下标
             * @return
             */
            openSelectQues: function (index) {
                self.index = index;
                $('.bs-example-modal-lg').modal('show');
            },
            /**
             * 提交试卷数据
             * @method
             * @param
             * @return
             */
            savePaper: function () {
                console.log(self.question);
                console.log(JSON.parse(JSON.stringify(self.question)));
                //发起ajax请求
            },
            /**
             * 关闭模态框、调用子组件方法清空子组件回传选择试题列表
             * @method
             * @param
             * @return
             */
            modalClose: function () {
                self.$refs.quesClean.cleanQues();
                $('.bs-example-modal-lg').modal('hide');
            }
        },
        components: {
            chooseQuestion: questionManage
        },
        mounted: function () {

        },
        created: function () {

        }
    };

})

