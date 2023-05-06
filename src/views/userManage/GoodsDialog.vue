<!--
:visible.sync  控制 显示隐藏

-->
<template>
    <el-dialog :title=title :visible.sync="a" width="70%" :before-close="handleClose">

        <div class="myform">
            <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" label-width="80px">
                <el-form-item label="类目选择" prop="category">
                    <el-button type="primary" @click="innerVisible = true"> 类目选择</el-button>
                    <span>{{ form.category }}</span>
                </el-form-item>
                <el-form-item label="商品名称" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="num">
                    <el-input v-model="form.num"></el-input>
                </el-form-item>

                <el-form-item label="发布时间">
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" v-model="form.date1" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品卖点">
                    <el-input v-model="form.sellpoint"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="image">
                    <el-button type="primary" @click="showImgUp">上传图片</el-button>
                </el-form-item>
                <el-form-item label="商品描述">
                    <wangEditor @sendEditor="getEditor"></wangEditor>
                </el-form-item>
            </el-form>
        </div>



        <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>

export default {
    props: [
        "title"
    ],
    data() {
        return {
            a: false,
            TreeDate:{},
            form: {
                category: '',
                cid:'',
                title: '',
                price: '',
                num: '',
                date1: '',
                date2: '',
                sellpoint: '',
                image: '',
                descs: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '请输入商品数量', trigger: 'blur' }
                ],

            },
            innerVisible:false,
            innerImgVisible:false,
        };
    },
    methods: {
        showImgUp(){
            this.innerImgVisible = !this.innerImgVisible
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
            done();
            })
            .catch(_ => {});
        },
        onSubmit() {

            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try{
                        const res = addGoods(this.form)
                        if(res.status == 200){
                            this.a = false
                            this.$parent.getGoodsList()
                            this.$message(
                                {
                                    message:'添加成功',
                                    type:'success'
                                }
                            )
                        }else{
                            this.$message.error('添加失败')
                        }
                    }catch(err){
                        console.error(err)
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            console.log(this.$children[0])
            this.$refs['form'].resetFields();
            this.a = false
            
        },
        getTreeDate(date){
           this.TreeDate = date;
           console.log(this.TreeDate);
        },
        showInnerVisible(){
            this.innerVisible = false
            this.form.category = this.TreeDate.name
            this.form.cid = this.TreeDate.cid
        },
        getImgURL(url){

        },
        getEditor(val){
           this.form.descs = val;
        },
    }
};
</script>

<style lang="scss" scoped>
.myform {
        padding: 20px;

        .line {
            text-align: center;
        }
    }
</style>