const Adminbro=require('admin-bro');
const Adminbroexpress=require('@admin-bro/express');
const express=require('express');
const app=express();
const adminbro=new Adminbro({
    Databases:[],
    rootPath:'/admin',
})

const router=Adminbroexpress.buildRouter(adminbro);

app.use(adminbro.options.rootPath,router);
app.listen(8080,() => {
    console.log('Adminbro is under localhost:8080/admin')
});
