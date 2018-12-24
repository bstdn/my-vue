<template>
  <el-row class="home">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed ? 'logo-collapse-width' : 'logo-width'">
        {{ collapsed ? '' : sysName }}
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img src="../../assets/header.jpeg"/>{{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleUser">个人信息</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <el-col :span="24" class="main">
      <aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 router
                 :collapse-transition="false"
                 :collapse="collapsed">
          <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
            <el-menu-item v-if="item.leaf && item.children.length > 0" :index="item.children[0].path">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
            <el-submenu v-if="!item.leaf" :index="index+''" v-bind:key="index">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>

      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">当前位置：{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>

          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

    <!-- 个人信息 -->
    <el-dialog title="个人信息" :visible.sync="editUserVisible" :close-on-click-model="false">
      <el-form :model="editUser" label-width="80px" :rules="editUserRules" ref="editUser">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" maxlength="150" :disabled="true" v-model="editUser.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input type="text" maxlength="32" v-model="editUser.telephone" clearable></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input type="text" maxlength="254" v-model="editUser.email" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editUserVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editUserSubmit" :loading="userLoading">修改</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import {getUser, editUserSelf} from '../../api/api';

  export default {
    name: "home",
    data() {
      return {
        sysName: 'VUEADMIN',
        collapsed: false,
        sysUserName: '',

        // 个人信息
        editUserVisible: false,
        userLoading: false,
        editUser: {
          username: '',
          telephone: '',
          email: '',
        },
        // 表单验证规则
        editUserRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 折叠
      collapse() {
        this.collapsed = !this.collapsed;
      },
      logout() {
        this.$confirm('确定退出吗?', '提示').then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        }).catch(() => {
        });
      },
      getUser() {
        let params = {username: this.sysUserName};
        getUser(params).then(res => {
          this.editUser = res.data.user;
        });
      },
      handleUser() {
        this.editUserVisible = true;
      },
      editUserSubmit() {
        this.$refs.editUser.validate(valid => {
          if(valid) {
            this.userLoading = true;
            let params = Object.assign({}, this.editUser);
            editUserSelf(params).then(res => {
              this.$message.success(res.msg);
              this.$refs.editUser.resetFields();
              this.editUserVisible = false;
              this.editUser = res.data;
              setTimeout(() => {
                this.userLoading = false;
              }, 300);
            }).catch(err => {
              this.userLoading = false;
              this.$message.error(err.response.data.message);
              this.$refs.editUser.resetFields();
              this.editUserVisible = false;
            });
          }
        });
      }
    },
    mounted() {
      let user = sessionStorage.getItem('user');
      if(user) {
        let username = JSON.parse(user).username;
        this.sysUserName = username || '';
      }
      this.getUser();
    }
  }
</script>

<style scoped>

</style>