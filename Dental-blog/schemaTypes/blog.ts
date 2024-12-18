

export default {
    name:'blog',
    title:"Blog",
    type:'document',
    fields:[
        {
            name:'title',
            type:'string',
            title:'Blog Title',
        },
        {
            name:'slug',
            type:'slug',
            title:'Blog Slug',
            options:{
                source:'title',
            }
        },{
            name:'blogImage',
            type:'image',
            title:'Blog Image',
        },{
            name:'smallDescription',
            type:'text',
            title:'Small Description',
        },{
            name:'blogContent',
            type:'array',
            title:'Blog Content',
            of:[
                {
                    type:'block'
                }
            ]
        }
    ]
}